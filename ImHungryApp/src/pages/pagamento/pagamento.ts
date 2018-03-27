import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-pagamento',
  templateUrl: 'pagamento.html',
})
export class PagamentoPage {

  @ViewChild('firstSlider') slides: Slides;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  meses = [{name: "Jan"}, {name: "Fev"}, {name: "Mar"}, {name: "Abr"},
  {name: "Mai"}, {name: "Jun"}, {name: "Jul"}, {name: "Ago"},
  {name: "Set"}, {name: "Out"}, {name: "Nov"}, {name: "Dez"}];

  anos = [{num: 2018}, {num: 2019}, {num: 2020}, {num: 2021},
    {num: 2022}, {num: 2023}, {num: 2024}, {num: 2025}];

  selectedCard = {};

  ionViewDidLoad() {
    this.slides.loop = true;
    this.slides.lockSwipes(false);
  }

  closeModal(){
    this.navCtrl.pop();
  }

  setNext(){
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
  }
}
