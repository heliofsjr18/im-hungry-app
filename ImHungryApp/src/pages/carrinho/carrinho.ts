import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ModalController } from 'ionic-angular';
import { CarrinhoProvider } from '../../providers/carrinho/carrinho'
import { MenuDetailPage } from '../menu-detail/menu-detail';
import $ from "jquery";
import { PagamentoPage } from '../pagamento/pagamento';
import { UsuarioProvider } from '../../providers/usuario/usuario';

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
    
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform,
   private carrinho: CarrinhoProvider, private userProvider: UsuarioProvider) {
  }

  data = [];
  total = 0.00;

  ionViewDidLoad() {
    if(this.platform.is('ios')){
      setTimeout(()=>{
        $(".back-button-text").text("");
      },100);
    }
    this.loadCart();
  }

  canPay(): boolean{
    return this.userProvider.userCanPay();
  }

  loadCart(){
    this.data = this.carrinho.getCart();
    this.total = this.carrinho.calcTotal();
  }

  cartPay(){
    this.navCtrl.push(PagamentoPage);
  }

  navegateToDetail(item): void {
    this.navCtrl.push(MenuDetailPage,{
      objSelecionado : item
    });
  }

  removeItemFromCart(item){
    this.carrinho.removeElement(item);
    this.loadCart();
  }

  addButton(item) {
    this.carrinho.adicionarCarrinho(item);
    this.loadCart();
  }

  removeButton(item){
    this.carrinho.removerCarrinho(item);
    this.loadCart();
  }


}
