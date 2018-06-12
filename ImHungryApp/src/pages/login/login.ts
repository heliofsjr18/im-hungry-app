import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { CarrinhoProvider } from '../../providers/carrinho/carrinho';
import { EstabelecimentoListPage } from '../estabelecimento-list/estabelecimento-list';
import { RestClientProvider } from '../../providers/rest-client/rest-client';
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { Facebook } from '@ionic-native/facebook';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { GooglePlus } from '@ionic-native/google-plus';
import { RegisterPage } from '../register/register';

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
    private rest: RestClientProvider,
    private storage: Storage) {

      this.storage.get('IHU')
        .then(
          data => {
            let body = {
              'email': data.email,
              'senha': data.password
            }
            //this.showErrorToast(data);
            this.login(body);
          },
          error => {
            this.showErrorToast(error);
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
        );
  }

  loginGoogle() {
    this.googlePlus.login({
      'webClientId': '125421574011-37f5eqh76k2evvogl7id37oclv6eb1om.apps.googleusercontent.com'
    }).then(res => {
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
      .catch((err) => {
        console.error(err);
        this.showErrorToast('Ocorreu um erro no login Google.');
      });
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
      .catch((e) => {
        console.log('Error logging into Facebook', e);
        this.showErrorToast('Ocorreu um erro no login com Facebook.')
      });
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
      .catch(err => console.log('Erro logout from Google', err));
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
  }

  login(body) {
    this.showLoading();

    //let credential = JSON.parse(body);
    //console.log(body);
    this.restLoginClient.getLoginRest(this.url, body)
      .then((res) => {
        // this.saveUserinfo(res);
        this.data = JSON.parse(res.toString());
        this.rest.Token = this.data.token;
        this.usuario.setUserObject(this.data.usuario);
        
        this.usuario.storageUser({email: body.email, password: body.senha});
        this.navCtrl.setRoot(EstabelecimentoListPage);
      })
      .catch((rej) => {
        this.data = JSON.parse(rej.toString());
        if (body.tipoUsuario == "redeSocial") {
          this.restLoginClient.getLoginRest("cliente/insert/social", body)
            .then((res) => {
              this.data = JSON.parse(res.toString());
              this.rest.Token = this.data.token;
              this.usuario.setUserObject(this.data.usuario);
              this.usuario.storageUser({email: body.email, password: body.senha});
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
      //console.log(credential);
  }

  showErrorToast(error) {
    let toast = this.toast.create({
      message: error,
      duration: 1500,
      position: 'top'
    });

    toast.present();
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: `<div class="loading">
                  <div class="loading-center">
                    <div class="loading-center-absolute">
                      <div class="loading-object loading-object-four" id="object_four"></div>
                      <div class="loading-object loading-object-three" id="object_three"></div>
                      <div class="loading-object loading-object-two" id="object_two"></div>
                      <div class="loading-object loading-object-one" id="object_one"></div>
                    </div>
                  </div>
                </div>`,
      spinner: 'hide',
      dismissOnPageChange: true,
      cssClass: 'my-loading-class'
    });
    this.loading.present();
  }

  createAccount() {
    this.navCtrl.push(RegisterPage);
  }

}
