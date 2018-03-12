import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the MenuListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu-list',
  templateUrl: 'menu-list.html',
})
export class MenuListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuListPage');
  }

  //Deve ser implementado aqui a recepção do objeto Json que virá do web service e distribuição do objeto no Array abaixo

  data = [
    { name: 'Opção menu', description: 'Exemplo de opção de menu', image: '/assets/imgs/test-logo.png'}
  ];

}
