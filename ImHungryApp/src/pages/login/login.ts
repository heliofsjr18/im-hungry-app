import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { CarrinhoProvider } from '../../providers/carrinho/carrinho';
import { EstabelecimentoListPage } from '../estabelecimento-list/estabelecimento-list';
import { RestClientProvider } from '../../providers/rest-client/rest-client';
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { Facebook } from '@ionic-native/facebook';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { GooglePlus } from '@ionic-native/google-plus';
import { RegisterPage } from '../register/register';

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

  isLoggedIn: boolean = false;

  rootPage: any;
  loading: Loading;
  data: any;
  registerCredentials = { email: 'cliente@teste.com', password: '123' };
  //@ViewChild('loginEmail') emailRef: ElementRef;
  //@ViewChild('loginPassword') passwordRef: ElementRef;

  public url = "cliente/login";
  users: any;

  constructor(private googlePlus: GooglePlus,
    private fb: Facebook,
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private toast: ToastController,
    public navParams: NavParams,
    public restLoginClient: LoginServiceProvider,
    private loadingCtrl: LoadingController,
    private usuario: UsuarioProvider,
    private rest: RestClientProvider, ) {
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
        let body = {
          'email': res.email,
          'senha': res.userId,
          'nome': res.displayName,
          'fot64': res.imageUrl,
          'tipoUsuario': "redeSocial"
        }
        this.login(body);
        this.isLoggedIn = true;
      })
      .catch(err => console.error(err));
  }

  loginFacebook() {
    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then(res => {
        if (res.status === "connected") {
          this.isLoggedIn = true;
          this.getUserDetail(res.authResponse.userID);
        } else {
          this.isLoggedIn = false;
        }
      })
      .catch(e => console.log('Error logging into Facebook', e));
  }

  loginMain() {
    let body = {
      'email': this.registerCredentials.email,
      'senha': this.registerCredentials.password,
    }
    this.login(body);
  }

  logoutGoogle() {
    this.googlePlus.logout()
      .then(res => {
        console.log(res);
        this.isLoggedIn = false;
      })
      .catch(err => console.error(err));
  }

  logoutFacebook() {
    this.fb.logout()
      .then(res => this.isLoggedIn = false)
      .catch(e => console.log('Error logout from Facebook', e));
  }

  getUserDetail(userid) {
    //this.fb.api("/" + userid + "/?fields=name", ['public_profile'])
    this.fb.api("/me?fields=name,email,id,picture", ['public_profile', 'email'])
      .then(res => {
        console.log(res);
        let body = {
          'nome': res.name,
          'email': res.email,
          'senha': res.id,
          'fot64': res.picture.data.url,
          'tipoUsuario': "redeSocial"
        }
        this.login(body);
      })
      .catch(e => {
        console.log(e);
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(body) {
    this.showLoading();

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
        if (body.tipoUsuario == "redeSocial") {
          this.restLoginClient.getLoginRest("cliente/insert", body)
            .then((res) => {
              this.data = JSON.parse(res.toString());
              this.rest.Token = this.data.token;
              this.usuario.setUserObject(this.data.usuario);
              this.navCtrl.setRoot(EstabelecimentoListPage);
            })
            .catch((rej) => {
              this.data = JSON.parse(rej.toString());
              this.showErrorToast(this.data.error.result);
            });
        } else {
          this.navCtrl.setRoot(LoginPage);
        }
        this.showErrorToast(this.data.error.result);
      });
  }

  showErrorToast(error) {
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

  createAccount() {
    this.navCtrl.push(RegisterPage);
  }

}
