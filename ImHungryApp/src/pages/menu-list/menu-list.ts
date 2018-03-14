import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import $ from "jquery";

@IonicPage()
@Component({
  selector: 'page-menu-list',
  templateUrl: 'menu-list.html',
})
export class MenuListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform) {
  }

  ionViewDidLoad() {
    if(this.platform.is('ios')){
      setTimeout(()=>{
        //Texto do botão voltar no ios.
        $(".back-button-text").text("");
      },100);
    }
  }

  //Deve ser implementado aqui a recepção do objeto Json que virá do web service e distribuição do objeto no Array abaixo

  data = [
    {name: 'Sushi', description: 'Pizza Hut da Favela', image: '/assets/imgs/test-prato.png', rate: 2.5, price: 'R$ 1329,90' , status: 1},
    {name: 'Sushi', description: 'Pizza Hut Boa Viagem', image: '/assets/imgs/test-prato.png', rate: 3.5, price: 'R$ 129,90', status: 0},
    {name: 'Sushi', description: 'Pizza Hut da Favela', image: '/assets/imgs/test-prato.png', rate: 1.5, price: 'R$ 129,90', status: 1},
    {name: 'Sushi', description: 'Pizza Hut Boa Viagem', image: '/assets/imgs/test-prato.png', rate: 4, price: 'R$ 129,90', status: 0},
    {name: 'Sushi', description: 'Pizza Hut da Favela', image: '/assets/imgs/test-prato.png', rate: 5, price: 'R$ 129,90', status: 1}
  ];

  onScroll(){
     
  }
}
