import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, ToastController, ActionSheetController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { LoginServiceProvider } from '../../providers/login-service/login-service';
import { RestClientProvider } from '../../providers/rest-client/rest-client';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { EstabelecimentoListPage } from '../estabelecimento-list/estabelecimento-list';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';

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
  userImage = 'assets/imgs/user-default.jpg';
  public url = "cliente/insert";

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private loadingCtrl: LoadingController,
    public restLoginClient: LoginServiceProvider,
    private rest: RestClientProvider,
    private usuario: UsuarioProvider,
    private toast: ToastController,
    private actionSheetCtrl: ActionSheetController,
    private camera: Camera,
    private imagePicker: ImagePicker) {

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
      if(this.user.fot64){
        this.userImage = 'data:image/jpeg;base64,' + this.user.fot64;
      }
    }else{
      this.pageTitle = 'Cadastro';
    }
  }

  openAvatarOptions(){
    let actionsheet = this.actionSheetCtrl.create({
      title: 'Alterar Foto',
      buttons: [
        {
          text: 'Tirar Foto',
          icon: 'camera',
          handler: () => {
            this.takePhoto();
          }
        },
        {
          text: 'Escolher da Galeria',
          icon: 'image',
          handler: () => {
            this.choosePhoto();
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          icon: 'close-circle',
          handler: () => {
            
          }
        }
      ]
    });
    actionsheet.present();
  }

  takePhoto(){
    let cameraOptions: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(cameraOptions).then((imageData) => {
      if(imageData){
        this.userImage = 'data:image/jpeg;base64,' + imageData;
        this.registerCredentials.fot64 = this.userImage;
        console.log(this.userImage);
      }
    }, (err) => {
      this.showToast(err);
    });
  }

  choosePhoto(){
    let options = {
      maximumImagesCount: 1,
      width: 150,
      height: 150,
      quality: 100,
      outputType: 1
    }

    this.imagePicker.getPictures(options).then((images) => {
      if(images[0]){
        this.userImage = 'data:image/jpeg;base64,' + images[0];
        this.registerCredentials.fot64 = this.userImage;
        console.log(this.userImage);
      }
    }, (err) => {
      this.showToast(err);
    });
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
  update(){
    let body = {
      'nome': this.registerCredentials.nome,
      'cpf': this.registerCredentials.cpf,
      'dataNasc': this.registerCredentials.nascimento,
      'email': this.registerCredentials.email,
      'senha': this.registerCredentials.senha,
      'telefone': this.registerCredentials.telefone,
      'foto': this.registerCredentials.fot64
    }
    if(body.senha === this.user.user_senha){
      body.senha = '';
    }
    this.showLoading();
    this.rest.getPostJson('cliente/update', body).then((data) => {
      this.dismissLoadding();
      this.showToast('Cadastro Atualizado Com Sucesso.')
      this.back();
    }).catch((error) => {
      this.dismissLoadding();
      this.showToast(error);
    });
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
        this.dismissLoadding();
      })
      .catch((rej) => {
        this.data = JSON.parse(rej.toString());
        this.dismissLoadding();
        this.showToast(this.data.error.result);
      });
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

  showToast(message) {
    let toast = this.toast.create({
      message: message.toString(),
      duration: 1500,
      position: 'top'
    });
    toast.present();
  }

  back() {
    this.navCtrl.popToRoot();
  }

  validation(): boolean{
    if(this.registerCredentials.nome.length < 1){
      this.showToast('Nome do usuário é obrigatório');
      return false;
    }
    else if(this.registerCredentials.cpf.length < 1){
      this.showToast('CPF é obrigatório');
      return false;
    }
    else if(this.registerCredentials.cpf.length < 11 || this.registerCredentials.cpf.length > 11){
      this.showToast('CPF inválido');
      return false;
    }
    else if(this.registerCredentials.nascimento.length < 1){
      this.showToast('Data de nascimento é obrigatória');
      return false;
    }
    else if(new Date(this.registerCredentials.nascimento) > new Date()){
      this.showToast('Data de nascimento inválida');
      return false;
    }
    else if(this.registerCredentials.email.length < 1){
      this.showToast('Email é obrigatório');
      return false;
    }
    else if(this.registerCredentials.email.indexOf('@') == -1){
      this.showToast('Email inválido');
      return false;
    }
    else if(this.registerCredentials.telefone.length < 1){
      this.showToast('Telefone é obrigatório');
      return false;
    }
  }

}
