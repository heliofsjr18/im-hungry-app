import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { RestClientProvider } from '../../providers/rest-client/rest-client';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { EstabelecimentoListPage } from '../estabelecimento-list/estabelecimento-list';

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
    email: '',
    senha: '',
    telefone: '',
    fot64: 'register',
  };
  pageTitle: string = '';
  user: any = {};
  public url = "cliente/insert";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    public restLoginClient: LoginServiceProvider,
    private rest: RestClientProvider,
    private usuario: UsuarioProvider,
    private toast: ToastController) {

      this.user = this.usuario.getUserObject();
  }

  ionViewDidLoad() {
    if(this.user.user_id){
      this.pageTitle = 'Minha Conta';
      this.registerCredentials = {
        nome: this.user.user_nome,
        cpf: this.user.user_cpf,
        nascimento: this.user.user_data,
        email: this.user.user_email,
        senha: this.user.user_senha,
        telefone: this.user.user_telefone,
        fot64: this.user.user_foto_perfil
      }
    }else{
      this.pageTitle = 'Cadastro';
    }
  }

  salvar(){
    if(this.validation()){
      if(this.user.user_id){
        this.update();
      }
      else{
        this.cadastrar();
      }
    }
  }

  validation(): boolean{
    if(this.registerCredentials.nome.length < 1){
      this.showErrorToast('Nome do usuário é obrigatório');
      return false;
    }
    else if(this.registerCredentials.cpf.length < 1){
      this.showErrorToast('CPF é obrigatório');
      return false;
    }
    else if(this.registerCredentials.cpf.length < 11 || this.registerCredentials.cpf.length > 11){
      this.showErrorToast('CPF inválido');
      return false;
    }
    else if(this.registerCredentials.nascimento.length < 1){
      this.showErrorToast('Data de nascimento é obrigatória');
      return false;
    }
    else if(new Date(this.registerCredentials.nascimento) > new Date()){
      this.showErrorToast('Data de nascimento inválida');
      return false;
    }
    else if(this.registerCredentials.email.length < 1){
      this.showErrorToast('Email é obrigatório');
      return false;
    }
    else if(this.registerCredentials.email.indexOf('@') == -1){
      this.showErrorToast('Email inválido');
      return false;
    }
    else if(this.registerCredentials.telefone.length < 1){
      this.showErrorToast('Telefone é obrigatório');
      return false;
    }
  }

  update(){

  }

  public cadastrar() {
    let body = {
      'nome': this.registerCredentials.nome,
      'cpf': this.registerCredentials.cpf,
      'nascimento': this.registerCredentials.nascimento,
      'email': this.registerCredentials.email,
      'senha': this.registerCredentials.senha,
      'telefone': this.registerCredentials.telefone,
      'fot64': this.registerCredentials.fot64
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
        this.showErrorToast(this.data.error.result);
      });
      this.dismissLoadding();
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
      cssClass: 'my-loading-class',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  dismissLoadding(){
    this.loading.dismiss();
  }

  format(value){
    let re =  this.usuario.format_cpf_cnpj(value);
    console.log(re);
    return re;
  }

  showErrorToast(error) {
    let toast = this.toast.create({
      message: error.toString(),
      duration: 1500,
      position: 'top'
    });
    toast.present();
  }

  cancelar() {
    this.navCtrl.popToRoot();
  }

}
