import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController,ToastController } from 'ionic-angular';

/**
 * Generated class for the CartaoFidelidadePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cartao-fidelidade',
  templateUrl: 'cartao-fidelidade.html',
})
export class CartaoFidelidadePage {

  message: string = "A quantidade de pedidos exigida por esse estabelecimento é o limite para que você, usuário possa liberar seu cartão fidelidade, e usá-lo com o beneficio de 1(UM) lanches grátis. Siginifica que ao comprar @param:qtdPedidos você receberá @param: benCartãoFidelidade.";
  showSearch: boolean = false;
  searchTerm: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController, private toast:ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartaoFidelidadePage');
  }

  
  toggleSearch() {
    this.showSearch = !this.showSearch;
  }


  onCancel(event) {
    this.toggleSearch();
  }

  
  onSearchChanged() {
    //this.loadList(false, null);
  }

  
  onClearSearch() {
    if (this.searchTerm.length > 1) {
      this.searchTerm = '';
    //  this.loadList(false, null);
    }
  }


  
  openFilterMenu() {
    this.menuCtrl.open("filtersMenu");
  }


  clickSearch() {
    this.toggleSearch();

    setTimeout(() => {
      $(".searchbar-ios-cancel > .button-inner").text("Cancelar");
    }, 100);

  }

  pushBack(){
    this.navCtrl.last();
  }

  helpClick(){

    let toast = this.toast.create({
    message: this.message.toString(),
    duration: 5000,
    position: 'center'
    });
    toast.present();
  }

}
