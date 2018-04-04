import { Component, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController, AlertController } from 'ionic-angular';
import $ from "jquery";
import { CarrinhoProvider } from '../../providers/carrinho/carrinho';
import { CarrinhoPage } from '../carrinho/carrinho';


@IonicPage()
@Component({
  selector: 'page-menu-detail',
  templateUrl: 'menu-detail.html',
})
export class MenuDetailPage {
  private item = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform,
  private carrinho: CarrinhoProvider, private detector: ChangeDetectorRef, private toastCtrl: ToastController,
  private alertCtrl: AlertController) {
    this.item = navParams.get('objSelecionado');
  }

  ionViewDidLoad() {
    if(this.platform.is('ios')){
      setTimeout(()=>{
        //Texto do botão voltar no ios.
        $(".back-button-text").text("");
      },100);
    }
  }

  makeCartDiffAlert(item){
    let cartAlert = this.alertCtrl.create({
      title: 'Esvaziar Carrinho',
      message: 'Existem Itens de um FoodTruck diferente no carrinho. Deseja esvaziar antes de adicionar?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancelar'
        },
        {
          text: 'Confirmar',
          role: 'confirmar',
          handler: e => {
            this.clearCart();
            this.addToCart(item);
          }
        }
      ]
    });

    cartAlert.present();
  }

  addToCart_Validate(item){
    if(this.carrinho.checkItemsFilial_Diff(item.filial_id)){
      this.makeCartDiffAlert(item);
    }else{
      this.addToCart(item); 
    }
  }

  clearCart(){
    this.carrinho.clearCart();
  }
  
  addToCart(item){
    this.carrinho.adicionarCarrinho(item);
    this.detector.detectChanges();

    let toast = this.toastCtrl.create({
      message: "Item adicionado com sucesso.",
      duration: 1000,
      position: 'bottom',
      showCloseButton: true,
      closeButtonText: 'X',
      cssClass: "myToast"
    });

    toast.present();
  }

  getTotalCarrinho(){
    return this.carrinho.getCountCarrinho();
  }

  openCart(){
    this.navCtrl.push(CarrinhoPage);
  }

}
