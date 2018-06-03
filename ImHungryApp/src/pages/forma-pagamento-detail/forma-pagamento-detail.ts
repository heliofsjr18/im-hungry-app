import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, Loading, LoadingController } from 'ionic-angular';
import { RestClientProvider } from '../../providers/rest-client/rest-client';

@IonicPage()
@Component({
  selector: 'page-forma-pagamento-detail',
  templateUrl: 'forma-pagamento-detail.html',
})
export class FormaPagamentoDetailPage {

  card =  {
    cartao_id: '',
    cartao_digitos: '',
    cartao_ano: '',
    cartao_mes: '',
    cartao_brand: 'visa',
    cartao_status: '',
    cartao_cvc: ''
  };
  cardType: string = 'credit';
  cardDate = '2018-06';
  pageTitle: string = 'Nova Forma de Pagamento';
  loading: Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController,
    private toastCtrl: ToastController, private loadingCtrl: LoadingController, private rest: RestClientProvider) {
  }

  ionViewDidLoad() {
    
  }

  saveCard(){
    if(this.card.cartao_id){
      this.updateCard();
    }
    else{
      this.createCard();
    }
  }

  validateCard(): boolean{
    if(this.card.cartao_digitos.length > 16 || this.card.cartao_digitos.length < 16){
      this.showToast('Número do cartão inválido');
      return false;
    }
    else if(this.card.cartao_cvc.length < 3){
      this.showToast('Código de Segurança inválido');
      return false;
    }
    return true;
  }

  createCard(){
    let splitted = this.cardDate.split("-"); 
    this.card.cartao_mes = splitted[1];
    this.card.cartao_ano = splitted[0];
    if(this.validateCard()){
      this.showLoading();

      let body = {
        'digitos': this.card.cartao_digitos,
        'ano': this.card.cartao_ano,
        'mes': this.card.cartao_mes,
        'brand': this.card.cartao_brand,
        'cvc': this.card.cartao_cvc
      }

      this.rest.getPostJson('cartao/insert', body).then((data) => {
        this.dimissLoading();
        this.closeModal();
      })
      .catch((error) => {
        console.log(error);
        this.dimissLoading();
        this.showToast('Erro ao salvar forma de pagamento');
      });
    }
  }

  updateCard(){

  }

  showLoading(){
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

  dimissLoading(){
    if(this.loading){
      this.loading.dismiss();
    }
  }

  showToast(message){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 1500,
      position: 'top'
    });
  }

  closeModal(){
    this.viewCtrl.dismiss();
  }

}
