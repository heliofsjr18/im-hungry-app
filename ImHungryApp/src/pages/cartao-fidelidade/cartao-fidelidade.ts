import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController,ToastController, AlertController  } from 'ionic-angular';

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
  
  showSearch: boolean = false;
  searchTerm: string = '';
  filialImage = this.navParams.get("image");
  filialName = this.navParams.get("name");
  fidelidadeDados = this.navParams.get("dadosFidelidade");
  fidelidadeBeneficio = this.fidelidadeDados.cartao_fid_beneficio;
  fidelidadeQtd = this.fidelidadeDados.cartao_fid_qtd;
  message: string = "A quantidade de pedidos exigida por esse estabelecimento é o limite para que você, usuário possa liberar seu cartão fidelidade, e usá-lo com o beneficio de 1(UM) lanches grátis. Siginifica que ao comprar "+this.fidelidadeQtd.toString()+" você receberá o seguinte benefício: "+this.fidelidadeBeneficio.toString()+".";
  

  //fidelidadeQuantidade = this.fidelidadeDados;

  constructor(public navCtrl: NavController, public navParams: NavParams, private menuCtrl: MenuController, private toast:ToastController, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log(this.fidelidadeDados);
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
    this.navCtrl.pop();
  }

  helpClick(){
    
      let alert = this.alertCtrl.create({
        title: 'Fica a Dica!',
        subTitle: this.message,
        buttons: ['OK']
      });
      alert.present();
    
  }

}
