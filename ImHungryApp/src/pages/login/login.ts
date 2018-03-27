import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CarrinhoProvider } from '../../providers/carrinho/carrinho';
import { CarrinhoPage } from '../carrinho/carrinho';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, private carrinho: CarrinhoProvider, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  
  getTotalCarrinho() {
    return this.carrinho.getCountCarrinho();
  }

  openCart(): void {
    this.navCtrl.push(CarrinhoPage);
  }

}
