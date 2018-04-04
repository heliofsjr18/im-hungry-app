import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { CarrinhoProvider } from '../../providers/carrinho/carrinho';
import { EstabelecimentoListPage } from '../estabelecimento-list/estabelecimento-list';
import { RestClientProvider } from '../../providers/rest-client/rest-client';
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { Facebook } from '@ionic-native/facebook';
import { UsuarioProvider } from '../../providers/usuario/usuario';

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

  rootPage: any;
  loading: Loading;
  data: any;
  registerCredentials = { email: 'cliente@teste.com', password: '123' };
  //@ViewChild('loginEmail') emailRef: ElementRef;
  //@ViewChild('loginPassword') passwordRef: ElementRef;

  public url = "usuario/login";
  public tipoUsuario = 2;

  isLoggedIn: boolean = false;
  users: any;

  constructor(private fb: Facebook, public navCtrl: NavController, private alertCtrl: AlertController, private toast: ToastController,public navParams: NavParams, public restLoginClient: LoginServiceProvider, private loadingCtrl: LoadingController, private usuario :UsuarioProvider) {
    fb.getLoginStatus()
      .then(res => {
        console.log(res.status);
        if (res.status === "connect") {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      })
      .catch(e => console.log(e));
  }

  loginFacebook() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then(res => {
        if(res.status === "connected") {
          this.isLoggedIn = true;
          this.getUserDetail(res.authResponse.userID);
        } else {
          this.isLoggedIn = false;
        }
      })
      .catch(e => console.log('Error logging into Facebook', e));
  }

  logout() {
    this.fb.logout()
      .then( res => this.isLoggedIn = false)
      .catch(e => console.log('Error logout from Facebook', e));
  }

  getUserDetail(userid) {
    this.fb.api("/"+userid+"/?fields=id,email,name,picture,gender",["public_profile"])
      .then(res => {
        console.log(res);
        this.users = res;
      })
      .catch(e => {
        console.log(e);
      });
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
      .then((res) => {
        // this.saveUserinfo(res);
        this.data = JSON.parse(res.toString());
         this.navCtrl.setRoot(EstabelecimentoListPage, {userData: this.data }); })
      .catch((rej) => {
        this.data = JSON.parse(rej.toString());
        let toast = this.toast.create({
          message: this.data.error.result,
          duration: 1500,
          position: 'top'
        })

        toast.present();
        this.navCtrl.setRoot(LoginPage);
      });

      ;

  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Aguarde...',
      spinner: 'crescent',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

}
