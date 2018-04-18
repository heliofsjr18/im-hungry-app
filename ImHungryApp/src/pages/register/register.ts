import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  registerCredentials = {
    nome: '',
    cpf: '',
    nascimento: '',
    email: '@teste.com',
    password: '',
    telefone: ''
  };
  public tipoUsuario = 2;
  public url = "usuario/cadastro";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  Cadastrar() {    
    
    let body = {
      'nome': this.registerCredentials.nome,
      'cpf': this.registerCredentials.cpf,
      'nascimento': this.registerCredentials.nascimento,
      'email': this.registerCredentials.email,
      'password': this.registerCredentials.password,
      'telefone': this.registerCredentials.telefone,
      'tipo': this.tipoUsuario
    }
    

  }


  Cancelar() {
    this.navCtrl.push(LoginPage);
  }

}
