import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, ToastController, ModalController } from 'ionic-angular';
import { RestClientProvider } from '../../providers/rest-client/rest-client';
import { FormaPagamentoDetailPage } from '../forma-pagamento-detail/forma-pagamento-detail';
import { UsuarioProvider } from '../../providers/usuario/usuario';


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
              private toastCtrl: ToastController,
              private modalCtrl: ModalController,
              private userProvider: UsuarioProvider) {
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

    this.creditCardList = [];
    this.originalCards = [];

    this.rest.getJson('cartao/list').then((data) => {
      
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
          cartao_cvc: object.cartões[i].cartao_cvc
        });
      }
      console.log(this.creditCardList);
      this.userProvider.updateCreditCards(this.originalCards);
      this.dimissLoading();
    })
    .catch((error) => {
      console.log(error);
      this.showToast('Erro ao obter as formas de pagamento.');
      this.dimissLoading();
      console.log(this.creditCardList);
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
    let modal = this.modalCtrl.create(FormaPagamentoDetailPage, {card: card});

    modal.onDidDismiss(() => {
      this.loadList();
    });

    modal.present();
  }

  addCardDetail(){
    let modal = this.modalCtrl.create(FormaPagamentoDetailPage);

    modal.onDidDismiss(() => {
      this.loadList();
    });

    modal.present();
  }

  removeCard(card, slidingItem){
    this.showLoading();

    let body = {
      'cartao_id': card.cartao_id
    }
    this.rest.getPostJson('cartao/enabled', body).then((data) => {
      this.dimissLoading();
      this.loadList();
      this.showToast('Forma de pagamento removida com sucesso');
    })
    .catch((error) => {
      this.dimissLoading();
      this.showToast('Erro ao remover forma de pagamento');
    });
  }

  dimissLoading(){
    if(this.loading){
      this.loading.dismiss();
    }
  }


}
