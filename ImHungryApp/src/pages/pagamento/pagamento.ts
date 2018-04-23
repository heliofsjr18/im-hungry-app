import { Component, ViewChild } from '@angular/core';
import { 
  IonicPage,
  NavController,
  NavParams,
  Slides,
  Slide,
  LoadingController,
  AlertController,
  ToastController
} from 'ionic-angular';
import { PagSeguroProvider } from '../../providers/pag-seguro/pag-seguro';
import { CarrinhoProvider } from '../../providers/carrinho/carrinho';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { EstabelecimentoListPage } from '../estabelecimento-list/estabelecimento-list';


@IonicPage()
@Component({
  selector: 'page-pagamento',
  templateUrl: 'pagamento.html',
})
export class PagamentoPage {

  @ViewChild('secondSlides') secondSlides: Slides;
  @ViewChild('firstSlides') firstSlides: Slides;
  constructor(public navCtrl: NavController, public navParams: NavParams, private pagSeguro: PagSeguroProvider,
    private loadingCtrl: LoadingController, private alertCtrl: AlertController, private toastCtrl: ToastController,
    private carrinho: CarrinhoProvider, private userProvider: UsuarioProvider) {
  }

  groupIcons = [1, 2, 3, 4];
  groupDigits = [1, 2, 3];
  paymentDone: boolean = false;
  paymentError: boolean = false;
  inPayment: boolean = false;
  checkOutId = '';
  cards = [];
  selectedCard = {id: '', brand: '', titular: '', cardNumber: '', expDate: '', cvv: ''};

  ionViewDidLoad() { 
    this.setCardSlidesOptions();
    this.loadCards();
    this.firstSlides.lockSwipes(true);
    this.setSelectedCard(0);
  }

  loadCards(){
    let tempCards = this.userProvider.getCreditCards();
    for(let i of tempCards.cards){
      let element = { id: i.cartao_id, brand: i.cartao_brand, lastDigits: i.cartao_digitos.substring(12, 16),
        expMon: i.cartao_mes, expYe: i.cartao_ano.substring(2,4), titular: tempCards.user_name, cvv: i.cartao_cvc
      };
      this.cards.push(element);
    }
  }

  getCardIconClass(brand: string){
    brand = brand.toLowerCase();
    if(brand == 'master'){
      return 'fab fa-cc-mastercard fa-3x';
    }else if(brand == 'visa'){
      return 'fab fa-cc-visa fa-3x';
    }else{
      return '';
    }
  }

  setCardSlidesOptions(){
    
    this.secondSlides.loop = this.cards.length > 1;
    if(this.cards.length > 1){
      this.secondSlides.spaceBetween = 250;
    }
    this.secondSlides.slidesPerView = this.cards.length > 1 ? 2 : 1;
  }

  slideChanged(){
    let currentIndex = this.secondSlides.realIndex;
    this.setSelectedCard(currentIndex);
  }

  setSelectedCard(currentIndex: number){

    this.selectedCard.id = this.cards[currentIndex].id;
    this.selectedCard.brand = this.cards[currentIndex].brand;
    this.selectedCard.cardNumber = '**** **** **** ' + this.cards[currentIndex].lastDigits;
    let year = (2000 +  Number.parseInt(this.cards[currentIndex].expYe));
    let month = Number.parseInt(this.cards[currentIndex].expMon) -1;
    this.selectedCard.expDate = new Date(year, month).toISOString(); 
    this.selectedCard.titular = this.cards[currentIndex].titular;
    this.selectedCard.cvv = this.cards[currentIndex].cvv;

  }

  doPayment(creditCardId){

    //this.firstSlideNext(false);

    this.inPayment = true;
    this.pagSeguro.doPayment(creditCardId).then((data) => {

      var obj = JSON.parse(data.toString());
      console.log(obj);
      
      this.getPagamentoStatus(obj.reference).then(() => {
        this.checkOutId = obj.reference.substring(8, 13);
        this.firstSlideNext();
        this.inPayment = false;
        this.paymentDone = true;
        console.log();
      });
    })
    .catch((data) => {
      this.inPayment = false;
      this.paymentError = true;
      this.firstSlideNext();
    });
  }

  getPagamentoStatus(referencia){
    
    return this.pagSeguro.getCheckOutStatus(referencia).then((data) => {
      var obj = JSON.parse(data.toString());
      //console.log(obj);
      if(obj.code != 4 && obj.code != 3){
        if(obj.code != 6 && obj.code != 7){
          return this.getPagamentoStatus(referencia);
        }else{
          return Promise.reject('ERRO DE PAGAMENTO');
        }
      }else{
        this.carrinho.clearCart();
        Promise.resolve();
      }
    }).catch((error) => {
      this.inPayment = false;
      this.paymentError = true;
    });
  }

  firstSlideNext(){
    this.firstSlides.lockSwipes(false);
    this.firstSlides.slideNext();
    this.firstSlides.lockSwipes(true);
  }

  firstSlidePrevious(){
    this.firstSlides.lockSwipes(false);
    this.firstSlides.slidePrev();
    this.firstSlides.lockSwipes(true);
  }

  showPaymentAlert(){
    let alert = this.alertCtrl.create({
      title: 'Código de Segurança',
      message: 'Insira o código de segurança do cartão para finalizar o pagamento',
      inputs: [
        {
          name: 'CVV',
          placeholder: 'Código de Segurança',
          type: 'password'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancelar'
        },
        {
          text: 'Confirmar',
          role: 'confirmar',
          handler: data => {
            console.log(data);
            if(data.CVV != '' && data.CVV == this.selectedCard.cvv){
              this.firstSlideNext();
              this.inPayment = true;
              this.doPayment(this.selectedCard.id);
            }
          }
        }
      ]
    });

    alert.present();
  }

  tryPayAgain(){
    this.firstSlidePrevious();
    this.inPayment = true;
    this.paymentDone = false;
    this.paymentError = false;
    this.doPayment(this.selectedCard.id);
  }

  showCloseButton(){
    return (!this.inPayment && !this.paymentDone) || this.paymentError;
  }

  backToRoot(){
    this.navCtrl.popToRoot();
  }

  closeModal(){
    if(this.inPayment && !this.paymentDone){
      //PAGAMENTO ESTÁ EM ANDANMENTO
    }else{
      this.navCtrl.pop();
    }
    
  }

}
