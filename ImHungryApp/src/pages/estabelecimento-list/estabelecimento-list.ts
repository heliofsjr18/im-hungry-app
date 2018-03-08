import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-estabelecimento-list',
  templateUrl: 'estabelecimento-list.html',
})
export class EstabelecimentoListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private detector: ChangeDetectorRef) {
  }

  data = [
    {name: 'Pizza Hut', description: 'Pizza Hut da Favela', image: '/assets/imgs/test-logo.png'},
    {name: 'Pizza Hut', description: 'Pizza Hut Boa Viagem', image: '/assets/imgs/test-logo.png'},
    {name: 'Pizza Hut', description: 'Pizza Hut da Favela', image: '/assets/imgs/test-logo.png'},
    {name: 'Pizza Hut', description: 'Pizza Hut Boa Viagem', image: '/assets/imgs/test-logo.png'},
    {name: 'Pizza Hut', description: 'Pizza Hut da Favela', image: '/assets/imgs/test-logo.png'}
  ];

  ionViewDidLoad() {
    console.log('ionViewDidLoad EstabelecimentoListPage');
  }

  onScroll(){
    //this.detector.markForCheck();
  }

}
