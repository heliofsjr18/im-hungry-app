import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, Slide, LoadingController } from 'ionic-angular';
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
    private loadingCtrl: LoadingController) {
  }

  groupIcons = [1, 2, 3, 4];
  groupDigits = [1, 2, 3];

  cards = [{brand: 'visa', lastDigits: '0355', expMon: '05', expYe: '29', titular: 'Terry Crews'},
  {brand: 'master', lastDigits: '5459', expMon: '08', expYe: '23', titular: 'Matheus Guilherme'}];
  selectedCard = {brand: '', titular: '', cardNumber: '', expDate: ''};

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

  doPayment(){
    let loading = this.loadingCtrl.create({
      spinner: 'crescent'
    });

    loading.present();

    this.pagSeguro.doPayment().then(() => {
      loading.dismiss();
    });
  }

  closeModal(){
    this.navCtrl.pop();
  }

}
