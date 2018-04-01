import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { RestClientProvider } from '../rest-client/rest-client';
import { CarrinhoProvider } from '../carrinho/carrinho';

declare var PagSeguroDirectPayment;

@Injectable()
export class PagSeguroProvider {

  constructor(public http: HttpClient, private restClient: RestClientProvider, private zone: NgZone,
   private carrinho: CarrinhoProvider) {
  }

  private paymentMethod = 'CREDIT_CARD';
  private pedido = {
    senderHash: '',
    creditCard: {
      num: '4485810539414993',
      cvv: '',
      expMon: '11',
      expYe: '2018',
      brand: '',
      token: ''
    },
    items: {items_id: [], items_qtd: []},
    total: 0
  }

  public doPayment(Cvv){
    //retorna tudo quando a sessão for iniciada
    return this.getSession().then((data) => {
      //sessionId
      let obj = JSON.parse(data.toString());
      this.initSession(obj.sessionId);
      
      this.pedido.creditCard.cvv = Cvv;

      this.pedido.items = this.carrinho.generateCartForApi();

      

      //método de pagamento
      let pay = (body) => {
        return this.restClient.getPostJson('checkout', body);/*.then((data) =>{
          console.log('DEU CERTO ' + data);
          console.log(this.pedido);
        })
        .catch((err) => {
          console.log(err);
          console.log(this.pedido);
        });*/
      };

      return this.prepareCreditCard().then(() => {

        let body = {
          'item_id': this.pedido.items.items_id,
          'item_qtd': this.pedido.items.items_qtd,
          'token': this.pedido.creditCard.token,
          'hash': PagSeguroDirectPayment.getSenderHash()
        };

        return pay(body);
      });//, (error) => {console.log(error); console.log(this.pedido); return error;});

    });
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
    });
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
        error(error) { reject('Informações do Cartão estão incorretas') }
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
        error(error) { reject('Informações do Cartão estão incorretas') }
      });
    });

  }

}
