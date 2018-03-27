import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CarrinhoProvider } from '../../providers/carrinho/carrinho';
import { CarrinhoPage } from '../carrinho/carrinho';
import { EstabelecimentoListPage } from '../estabelecimento-list/estabelecimento-list';
import { RestClientProvider } from '../../providers/rest-client/rest-client';


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

  @ViewChild('loginEmail') emailRef: ElementRef;
  @ViewChild('loginPassword') passwordRef: ElementRef;

  public url = "usuario/login";

  public tipoUsuario = 2;
  public email = this.emailRef.nativeElement.innerText;
  public password = this.passwordRef.nativeElement.innerText;




  constructor(public navCtrl: NavController, private carrinho: CarrinhoProvider, public navParams: NavParams, public restClient: RestClientProvider) {
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

  logar() {

    let body = {
      'email': this.email,
      'password': this.password,
      'tipoUsuario': this.tipoUsuario
    }

    this.restClient.getLoginJson(body, this.url)
      .then((res) => { this.navCtrl.push(EstabelecimentoListPage) })
      .catch((rej) => { console.log(rej); });
    
  }


}
