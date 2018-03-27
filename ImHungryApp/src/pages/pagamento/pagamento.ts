import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, Slide } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-pagamento',
  templateUrl: 'pagamento.html',
})
export class PagamentoPage {

  @ViewChild('secondSlides') secondSlides: Slides;
  @ViewChild('firstSlides') firstSlides: Slides;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  cards = [{name: 'CARTÃO 1'}, {name: 'CARTÃO 2'}];
  ionViewDidLoad() { 
    this.setCardSlidesOptions();
    this.firstSlides.lockSwipes(true);
  }

  setCardSlidesOptions(){
    
    this.secondSlides.loop = this.cards.length > 1;
    if(this.cards.length > 1){
      this.secondSlides.spaceBetween = 250;
    }
    this.secondSlides.slidesPerView = this.cards.length > 1 ? 2 : 1;
  }

  showSlidePager(){
    return this.cards.length > 1;
  }

  closeModal(){
    this.navCtrl.pop();
  }

}
