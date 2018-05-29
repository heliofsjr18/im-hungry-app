import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FCM } from '@ionic-native/fcm';
import { Storage } from '@ionic/storage';
import { CarrinhoProvider } from '../carrinho/carrinho';

@Injectable()
export class UsuarioProvider {

  private user = {
    user_id: '',
    user_nome: '',
    user_senha: '',
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

  fcmTopicPrefix: string = 'com.br.ImHungryApp-';
  DECIMAL_SEPARATOR=".";
  GROUP_SEPARATOR=",";
  pureResult: any;
  maskedId: any;

  constructor(public http: HttpClient, private fcm: FCM, private storage: Storage, private cart: CarrinhoProvider) {
  }

  public setUserObject(userObj){
    this.user = userObj;
    this.userSubscribeToTopic();
  }

  public userLogout(){
    this.userUnsubscribeToTopic();
    this.storage.remove('IHU');
    this.resetUser();
    this.cart.clearCart();
  }

  private userSubscribeToTopic(){
    this.fcm.subscribeToTopic(this.fcmTopicPrefix + this.user.user_id);
  }

  private userUnsubscribeToTopic(){
    this.fcm.unsubscribeFromTopic(this.fcmTopicPrefix + this.user.user_id);
  }

  public storageUser(credential: {email, password}){
    this.storage.set('IHU', {email: credential.email, password: credential.password});
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

  public format_cpf_cnpj(valString){
    if(!valString){
      return '';
    }
    let val = valString.toString();
    const parts = this.unFormat(val).split(this.DECIMAL_SEPARATOR);
    this.pureResult = parts;
    if(parts[0].length <= 11){
      this.maskedId = this.cpf_mask(parts[0]);
      return this.maskedId;
    }else{
      this.maskedId = this.cnpj_mask(parts[0]);
      return this.maskedId;
    }
  }

  unFormat(val){
    if(!val){
      return '';
    }
    val = val.replace(/\D/g, '');

    if (this.GROUP_SEPARATOR === ',') {
        return val.replace(/,/g, '');
    } else {
        return val.replace(/\./g, '');
    }
  }

  cpf_mask(v){
    v = v.replace(/\D/g, ''); //Remove tudo o que não é dígito
    v = v.replace(/(\d{3})(\d)/, '$1.$2'); //Coloca um ponto entre o terceiro e o quarto dígitos
    v = v.replace(/(\d{3})(\d)/, '$1.$2'); //Coloca um ponto entre o terceiro e o quarto dígitos
    //de novo (para o segundo bloco de números)
    v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); //Coloca um hífen entre o terceiro e o quarto dígitos
    return v;
  }

  cnpj_mask(v){
    v = v.replace(/\D/g, ''); //Remove tudo o que não é dígito
    v = v.replace(/^(\d{2})(\d)/, '$1.$2'); //Coloca ponto entre o segundo e o terceiro dígitos
    v = v.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3'); //Coloca ponto entre o quinto e o sexto dígitos
    v = v.replace(/\.(\d{3})(\d)/, '.$1/$2'); //Coloca uma barra entre o oitavo e o nono dígitos
    v = v.replace(/(\d{4})(\d)/, '$1-$2'); //Coloca um hífen depois do bloco de quatro dígitos
    return v;
  }

  private resetUser(){
    this.user = {
      user_id: '',
      user_nome: '',
      user_senha: '',
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
  }
}
