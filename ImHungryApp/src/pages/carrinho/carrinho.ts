import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController } from 'ionic-angular';
import { CarrinhoProvider } from '../../providers/carrinho/carrinho'
import { MenuDetailPage } from '../menu-detail/menu-detail';
import $ from "jquery";

@IonicPage()
@Component({
  selector: 'page-carrinho',
  templateUrl: 'carrinho.html',
})
export class CarrinhoPage {

  mylblRef: any;
  @ViewChild('lblMultiplicador') lblMultiplicadorRef: ElementRef;
  @ViewChild('lblDescricao') lblDescricaoRef: ElementRef;
  @ViewChild('lblPreco') lblPrecoRef: ElementRef;

  someWhereInCode() {
    console.log(this.mylblRef.nativeElement.innerText);
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform,
   private loadCtrl: LoadingController, private carrinho: CarrinhoProvider) {
  }

  data = [];
  total = '0,00';

  ionViewDidLoad() {
    if(this.platform.is('ios')){
      setTimeout(()=>{
        $(".back-button-text").text("");
      },100);
    }
    this.loadCart();
  }

  loadCart(){
    this.data = this.carrinho.getCart();
    this.sumCart();
  }

  sumCart(){
    
  }

  cartPay(){
    
    let loading = this.loadCtrl.create({
      spinner: 'crescent',
      content: 'Efetuando pagamento. Aguarde...'
    });

    loading.present();

    setTimeout(()=> {
      loading.dismiss();
    },1500);

  }

  navegateToDetail(item): void {
    this.navCtrl.push(MenuDetailPage,{
      objSelecionado : item
    });
  }

  addButton(item) {
    this.carrinho.adicionarCarrinho(item);
  }

  removeButton(item){
    this.carrinho.removerCarrinho(item);
  }


}
