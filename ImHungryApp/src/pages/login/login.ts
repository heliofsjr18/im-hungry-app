import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController } from 'ionic-angular';
import { CarrinhoProvider } from '../../providers/carrinho/carrinho';
import { EstabelecimentoListPage } from '../estabelecimento-list/estabelecimento-list';
import { RestClientProvider } from '../../providers/rest-client/rest-client';
import { LoginServiceProvider } from '../../providers/login-service/login-service';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  rootPage : any;
  loading: Loading;
  registerCredentials = { email: 'cliente@teste.com', password: '123' };
  //@ViewChild('loginEmail') emailRef: ElementRef;
  //@ViewChild('loginPassword') passwordRef: ElementRef;
  
  public url = "usuario/login";
  public tipoUsuario = 2;



  constructor(public navCtrl: NavController, private alertCtrl: AlertController, public navParams: NavParams, public restLoginClient: LoginServiceProvider, private loadingCtrl: LoadingController) {  

}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
  
  login() {
    this.showLoading();

    let body = {
      'email': this.registerCredentials.email,
      'senha': this.registerCredentials.password,
      'tipo': this.tipoUsuario
    }

    this.restLoginClient.getLoginRest(this.url, body)
      .then((res) => { this.navCtrl.setRoot(EstabelecimentoListPage); })
      .catch((rej) => { console.log(rej); });
    
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

}
