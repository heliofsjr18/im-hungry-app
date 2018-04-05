import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { RestClientProvider } from '../rest-client/rest-client';
import { CarrinhoProvider } from '../carrinho/carrinho';
import { UsuarioProvider } from '../usuario/usuario';

declare var PagSeguroDirectPayment;

@Injectable()
export class PagSeguroProvider {

  constructor(public http: HttpClient, private restClient: RestClientProvider, private zone: NgZone,
   private carrinho: CarrinhoProvider, private userProvider: UsuarioProvider) {
  }

  private paymentMethod = 'CREDIT_CARD';
  private pedido = {
    senderHash: '',
    creditCard: {
      id: '',
      num: '',
      cvv: '',
      expMon: '',
      expYe: '',
      brand: '',
      token: ''
    },
    items: {items_id: [], items_qtd: []},
    total: 0
  }

  public doPayment(creditCardId){
    //retorna tudo quando a sessão for iniciada
    return this.getSession().then((data) => {
      //sessionId
      let obj = JSON.parse(data.toString());
      this.initSession(obj.sessionId);
      
      this.setPagamentoCard(creditCardId);

      this.pedido.items = this.carrinho.generateCartForApi();

      //método de pagamento
      let pay = (body) => {
        return this.restClient.getPostJson('checkout', body);
      };

      return this.prepareCreditCard().then(() => {

        let body = {
          'item_id': this.pedido.items.items_id,
          'item_qtd': this.pedido.items.items_qtd,
          'token': this.pedido.creditCard.token,
          'hash': PagSeguroDirectPayment.getSenderHash(),
          'cartao_id': this.pedido.creditCard.id
        };
        return pay(body);
      });

    });
  }

  private setPagamentoCard(creditCardId){
    let referencedCard = this.userProvider.getCreditCardById(creditCardId);

    let tmpPedidoCard = {id: referencedCard.cartao_id, num: referencedCard.cartao_digitos,
      cvv: referencedCard.cartao_cvc, expMon: referencedCard.cartao_mes, expYe: referencedCard.cartao_ano, brand: '', token: ''
    };
    this.pedido.creditCard = tmpPedidoCard;
  }

  public getCheckOutStatus(referencia){
    let body = {
      'referencia' : referencia
    };
    return this.restClient.getPostJson('checkout/status', body);
  }

  private getSession(){
    return this.restClient.getJson('session');
  }

  private initSession(sessionId){
    PagSeguroDirectPayment.setSessionId(sessionId);
  }

  private prepareCreditCard(){
    return this.getCardBrand().then(() => {
      return this.getCardToken();
    })
  }

  private getCardBrand(): Promise<any>{
    return new Promise((resolve, reject) => {
      PagSeguroDirectPayment.getBrand({
        cardBin: this.pedido.creditCard.num,//.substring(0, 6),
        success: (response) => {
          this.zone.run(() => {
            this.pedido.creditCard.brand = response.brand.name;
            console.log(response);
            resolve({brand: response.brand.name});
          });
        },
        error(error) { reject(error); }
      });
    });
  }

  private getCardToken(): Promise<any>{

    return new Promise((resolve, reject) => {
      PagSeguroDirectPayment.createCardToken({
        cardNumber: this.pedido.creditCard.num,
        brand: this.pedido.creditCard.brand,
        cvv: this.pedido.creditCard.cvv,
        expirationMonth: this.pedido.creditCard.expMon,
        expirationYear: this.pedido.creditCard.expYe,
        success: (response) => {
          this.zone.run(() => {
            this.pedido.creditCard.token = response.card.token;
            resolve({token: response.card.token});
            console.log(response);
          });
        },
        error(error) {reject(error); }
      });
    });

  }

}
