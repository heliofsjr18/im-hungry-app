import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, ToastController } from 'ionic-angular';
import { RestClientProvider } from '../../providers/rest-client/rest-client';


@IonicPage()
@Component({
  selector: 'page-formas-pagamento',
  templateUrl: 'formas-pagamento.html',
})
export class FormasPagamentoPage {

  creditCardList = [
    {
      cartao_id: '',
      cartao_digitos: '',
      cartao_ano: '',
      cartao_mes: '',
      cartao_brand: '',
      cartao_status: '',
      cartao_cvc: ''
    }
  ];

  originalCards = [
    {
      cartao_id: '',
      cartao_digitos: '',
      cartao_ano: '',
      cartao_mes: '',
      cartao_brand: '',
      cartao_status: '',
      cartao_cvc: ''
    }
  ];

  loading: Loading;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private loadingCtrl: LoadingController,
              private rest: RestClientProvider,
              private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    this.loadList();
  }

  getCardClass(card){
    if(card.cartao_brand == 'master'){
      return 'fab fa-cc-mastercard fa-2x';
    }else if(card.cartao_brand == 'visa'){
      return 'fab fa-cc-visa fa-2x';
    }else{
      return 'fas fa-question-circle fa-2x';
    }
  }

  loadList(){
    this.showLoading();

    this.rest.getJson('cartao/list').then((data) => {
      this.creditCardList = [];
      this.originalCards = [];
      let object = JSON.parse(data.toString());
      this.originalCards = object.cartões;
      for(let i in object.cartões){
        this.creditCardList.push({
          cartao_id: object.cartões[i].cartao_id,
          cartao_digitos: object.cartões[i].cartao_digitos.substring(12, 16),
          cartao_ano: object.cartões[i].cartao_ano.substring(2,4),
          cartao_mes: object.cartões[i].cartao_mes,
          cartao_brand: object.cartões[i].cartao_brand,
          cartao_status: object.cartões[i].cartao_status,
          cartao_cvc: ''
        });
      }
      console.log(this.creditCardList);
      this.dimissLoading();
    })
    .catch((error) => {
      console.log(error);
      this.showToast('Erro ao obter as formas de pagamento.');
      this.dimissLoading();
    });
  }

  showToast(message){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 1500,
      position: 'top'
    });
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

  openCardDetail(card){
    console.log('editar');
    console.log(card);
  }

  removeCard(card, slidingItem){
    console.log('remover');
    console.log(card);
    console.log(slidingItem);
    slidingItem.close();
  }

  dimissLoading(){
    if(this.loading){
      this.loading.dismiss();
    }
  }


}
