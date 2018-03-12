import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuListPage } from '../menu-list/menu-list';

@IonicPage()
@Component({
  selector: 'page-estabelecimento-list',
  templateUrl: 'estabelecimento-list.html',
})
export class EstabelecimentoListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private detector: ChangeDetectorRef) {
  }

  data = [
    {name: 'Pizza Hut', description: 'Pizza Hut da Favela', image: '/assets/imgs/test-logo.png', rate: 2.5},
    {name: 'Pizza Hut', description: 'Pizza Hut Boa Viagem', image: '/assets/imgs/test-logo.png', rate: 3.5},
    {name: 'Pizza Hut', description: 'Pizza Hut da Favela', image: '/assets/imgs/test-logo.png', rate: 1.5},
    {name: 'Pizza Hut', description: 'Pizza Hut Boa Viagem', image: '/assets/imgs/test-logo.png', rate: 4},
    {name: 'Pizza Hut', description: 'Pizza Hut da Favela', image: '/assets/imgs/test-logo.png', rate: 5}
  ];

  ionViewDidLoad() {
    console.log('ionViewDidLoad EstabelecimentoListPage');
  }

  onScroll(){
    //this.detector.markForCheck();
  }

  logStars(event){
    console.log(event);
  }

  chamaTelaMenu() {
    this.navCtrl.push(MenuListPage);
  }

}
