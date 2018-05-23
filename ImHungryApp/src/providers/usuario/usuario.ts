import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FCM } from '@ionic-native/fcm';
import { Storage } from '@ionic/storage';

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

  constructor(public http: HttpClient, private fcm: FCM, private storage: Storage) {
  }

  public setUserObject(userObj){
    this.user = userObj;
    this.userSubscribeToTopic();
  }

  public userLogout(){
    this.userUnsubscribeToTopic();
    this.storage.remove('IHU');
    this.resetUser();
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
