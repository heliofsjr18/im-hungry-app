import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { RestClientProvider } from '../../providers/rest-client/rest-client';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { EstabelecimentoListPage } from '../estabelecimento-list/estabelecimento-list';

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

  loading: Loading;
  data: any;
  registerCredentials = {
    nome: '',
    cpf: '',
    nascimento: '',
    email: '@teste.com',
    password: '',
    telefone: ''
  };
  public url = "app/cliente/insert";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    public restLoginClient: LoginServiceProvider,
    private rest: RestClientProvider,
    private usuario: UsuarioProvider,
    private toast: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  public cadastrar() {
    let body = {
      'nome': this.registerCredentials.nome,
      'cpf': this.registerCredentials.cpf,
      'nascimento': this.registerCredentials.nascimento,
      'email': this.registerCredentials.email,
      'password': this.registerCredentials.password,
      'telefone': this.registerCredentials.telefone
    }
    this.save(body)
  }

  public save(body) {
    this.showLoading();

    this.restLoginClient.getLoginRest(this.url, body)
      .then((res) => {
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

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Aguarde...',
      spinner: 'crescent',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  showErrorToast(error) {
    let toast = this.toast.create({
      message: error.toString(),
      duration: 1500,
      position: 'top'
    });

    toast.present();
  }

  Cancelar() {
    this.navCtrl.push(LoginPage);
  }

}
