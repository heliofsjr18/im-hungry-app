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
    private carrinho: CarrinhoProvider) {
  }

  groupIcons = [1, 2, 3, 4];
  groupDigits = [1, 2, 3];
  paymentDone: boolean = false;
  paymentError: boolean = false;
  inPayment: boolean = false;
  checkOutId = '';
  cards = [{brand: 'visa', lastDigits: '4993', expMon: '11', expYe: '18', titular: 'Terry Crews'},
  {brand: 'master', lastDigits: '5459', expMon: '08', expYe: '23', titular: 'Matheus Guilherme'}];
  selectedCard = {brand: '', titular: '', cardNumber: '', expDate: '', cvv: ''};

  ionViewDidLoad() { 
    this.setCardSlidesOptions();
    this.firstSlides.lockSwipes(true);
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

    this.selectedCard.brand = this.cards[currentIndex].brand;
    this.selectedCard.cardNumber = '**** **** **** ' + this.cards[currentIndex].lastDigits;
    let year = (2000 +  Number.parseInt(this.cards[currentIndex].expYe));
    let month = Number.parseInt(this.cards[currentIndex].expMon) -1;
    this.selectedCard.expDate = new Date(year, month).toISOString(); 
    this.selectedCard.titular = this.cards[currentIndex].titular;

  }

  doPayment(Cvv){

    //this.firstSlideNext(false);

    this.inPayment = true;
    this.pagSeguro.doPayment(Cvv).then((data) => {

      var obj = JSON.parse(data.toString());
      console.log(obj);
      
      this.getPagamentoStatus(obj.reference).then(() => {
        this.checkOutId = obj.reference.substring(8, 13);
        this.firstSlideNext();
        this.carrinho.clearCart();
        this.inPayment = false;
        this.paymentDone = true;
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
        return data;
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
            if(data.CVV != ''){
              this.firstSlideNext();
              this.inPayment = true;
              this.doPayment(data.CVV);
            }
            this.selectedCard.cvv = data.CVV;
          }
        }
      ]
    });

    alert.present();
  }

  closeModal(){
    if(this.inPayment && !this.paymentDone){
      //PAGAMENTO ESTÁ EM ANDANMENTO
    }else{
      this.navCtrl.pop();
    }
    
  }

}
