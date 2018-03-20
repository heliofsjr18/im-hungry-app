import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, LoadingController } from 'ionic-angular';
import $ from "jquery";

@IonicPage()
@Component({
  selector: 'page-carrinho',
  templateUrl: 'carrinho.html',
})
export class CarrinhoPage {

  @ViewChild('lblMultiplicador') lblMultiplicadorRef: ElementRef;
  @ViewChild('lblDescricao') lblDescricaoRef: ElementRef;
  @ViewChild('lblPreco') lblPrecoRef: ElementRef;

  someWhereInCode() {
    console.log(this.mylblRef.nativeElement.innerText);
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform,
   private loadCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    if(this.platform.is('ios')){
      setTimeout(()=>{
        $(".back-button-text").text("");
      },100);
    }
  }

  cartPay(){
    let loading = this.loadCtrl.create({
      spinner: 'crescent',
      content: 'Efetuando pagamento. Aguarde...'
    });

    loading.present();

    setTimeout(()=> {
      loading.dismiss();
    },10000);
  }


  addButton() {
    this.lblMultiplicadorRef.nativeElement.innerText =+ 1;
  }

  removeButton(){
    this.lblMultiplicadorRef.nativeElement.innerText =- 1;
  }


}
