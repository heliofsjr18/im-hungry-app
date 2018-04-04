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


@IonicPage()
@Component({
  selector: 'page-pagamento',
  templateUrl: 'pagamento.html',
})
export class PagamentoPage {

  @ViewChild('secondSlides') secondSlides: Slides;
  @ViewChild('firstSlides') firstSlides: Slides;
  constructor(public navCtrl: NavController, public navParams: NavParams, private pagSeguro: PagSeguroProvider,
    private loadingCtrl: LoadingController, private alertCtrl: AlertController, private toastCtrl: ToastController) {
  }

  groupIcons = [1, 2, 3, 4];
  groupDigits = [1, 2, 3];
  paymentDone: boolean = false;
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
        this.firstSlideNext(false);
        this.inPayment = false;
        this.paymentDone = true;
      }, (error) => {this.showErrorToast(error)});
      
    }, (error) => {
      this.showErrorToast(error);
    })
    .catch((data) => {
      this.showErrorToast(data);
    });

    
  }

  getPagamentoStatus(referencia){
    return this.pagSeguro.getCheckOutStatus(referencia).then((data) => {
      var obj = JSON.parse(data.toString());
      //console.log(obj);
      if(obj.code != 4 && obj.code != 3){
        return this.getPagamentoStatus(referencia);
      }else{
        return data;
      }
    });
  }

  firstSlideNext(isPayment: boolean){
    this.firstSlides.lockSwipes(false);
    this.firstSlides.slideNext();
    this.firstSlides.lockSwipes(true);
  }

  showErrorToast(message){
    let toast = this.toastCtrl.create({
      message: 'Ocorreu um erro: ' + message,
      position: 'bottom',
      duration: 3000
    });

    toast.present();
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
              this.firstSlideNext(true);
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
