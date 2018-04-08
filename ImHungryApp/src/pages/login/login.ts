import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { CarrinhoProvider } from '../../providers/carrinho/carrinho';
import { EstabelecimentoListPage } from '../estabelecimento-list/estabelecimento-list';
import { RestClientProvider } from '../../providers/rest-client/rest-client';
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { Facebook } from '@ionic-native/facebook';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { GooglePlus } from '@ionic-native/google-plus';

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
  providers: [GooglePlus]
})
export class LoginPage {

  displayName: any;
  email: any;
  familyName: any;
  givenName: any;
  userId: any;
  imageUrl: any;

  isLoggedIn:boolean = false;

  rootPage: any;
  loading: Loading;
  data: any;
  registerCredentials = { email: 'cliente@teste.com', password: '123' };
  //@ViewChild('loginEmail') emailRef: ElementRef;
  //@ViewChild('loginPassword') passwordRef: ElementRef;

  public url = "usuario/login";
  public tipoUsuario = 2;

  users: any;

  constructor(private googlePlus: GooglePlus, private fb: Facebook, public navCtrl: NavController, private alertCtrl: AlertController, private toast: ToastController,public navParams: NavParams, public restLoginClient: LoginServiceProvider, private loadingCtrl: LoadingController, private usuario :UsuarioProvider,
    private rest: RestClientProvider) {
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

  loginGoogle() {
    this.googlePlus.login({})
      .then(res => {
        console.log(res);
        this.displayName = res.displayName;
        this.email = res.email;
        this.familyName = res.familyName;
        this.givenName = res.givenName;
        this.userId = res.userId;
        this.imageUrl = res.imageUrl;

        this.isLoggedIn = true;
      })
      .catch(err => console.error(err));
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

  logoutGoogle() {
    this.googlePlus.logout()
      .then(res => {
        console.log(res);
        this.displayName = "";
        this.email = "";
        this.familyName = "";
        this.givenName = "";
        this.userId = "";
        this.imageUrl = "";

        this.isLoggedIn = false;
      })
      .catch(err => console.error(err));
  }

  logoutFacebook() {
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
      this.rest.Token = this.data.token;
      this.usuario.setUserObject(this.data.usuario);
      this.navCtrl.setRoot(EstabelecimentoListPage);
      
    })
    .catch((rej) => {
      this.data = JSON.parse(rej.toString());
      this.navCtrl.setRoot(LoginPage);
      this.showErrorToast(this.data.error.result);
    });

  }

  showErrorToast(error){
    let toast = this.toast.create({
      message: error.toString(),
      duration: 1500,
      position: 'top'
    });

    toast.present();
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
