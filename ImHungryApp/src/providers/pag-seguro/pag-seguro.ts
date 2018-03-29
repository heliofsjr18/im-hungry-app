import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestClientProvider } from '../rest-client/rest-client';

declare var PagSeguroDirectPayment;

@Injectable()
export class PagSeguroProvider {

  constructor(public http: HttpClient, private restClient: RestClientProvider) {
  }

  private paymentMethod = 'CREDIT_CARD';
  private pedido = {
    senderHash: '',
    creditCard: {
      num: '',
      cvv: '',
      name: '',
      expMon: '',
      expYe: '',
      brand: '',
      token: ''
    },
    items: [{id: 0, qtd: 0}],
    total: 0
  }

  public doPayment(){
    //retorna tudo quando a sessão for iniciada
    return this.getSession().then((data) => {
      
      this.initSession(data);
      this.getCardBrand();
      this.getCardToken();

      let body = {};

      return this.restClient.getPostJson('url', body); // executa o end point de pagamento

    });
  }



  private getSession(){
    return this.restClient.getJson('session');
  }

  private initSession(sessionId){
    PagSeguroDirectPayment.setSessionId(sessionId);
  }

  private prepareCreditCard(){

    
  }

  private getCardBrand(){
    
  }

  private getCardToken(){
    
  }

}
