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
        $(".back-button-text").text("Voltar");
      },100);
    }
  }

  //Deve ser implementado aqui a recepção do objeto Json que virá do web service e distribuição do objeto no Array abaixo

  data = [
    { name: 'Opção menu', description: 'Exemplo de opção de menu', image: '/assets/imgs/test-logo.png'}
  ];

}
