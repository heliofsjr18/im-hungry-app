import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UsuarioProvider {

  private user = {
    user_id: '',
    user_nome: '',
    user_cpf: '',
    user_email: '',
    user_telefone: '',
    user_data: '',
    user_cadastro: '',
    user_foto_perfil: null,
    user_status: '',
    tipo_id: '',
    dateAniversario: '',
    dateCadastro: '',
    credCards: {
      qtd: 0,
      list: [
        {
          cartao_id: '',
          cartao_digitos: '',
          cartao_ano: '',
          cartao_mes: '',
          cartao_brand: '',
          cartao_status: '',
          cartao_cvc: ''
        }
      ]
    }
  };

  constructor(public http: HttpClient) {
  }

  public setUserObject(userObj){
    this.user = userObj;
  }

  public getUserObject(){
    return this.user;
  }

  public getCreditCards(){
    return {cards: this.user.credCards.list, user_name: this.user.user_nome};
  }

  public getCreditCardById(cartao_id){
    return this.user.credCards.list.find(x => x.cartao_id == cartao_id);
  }
}
