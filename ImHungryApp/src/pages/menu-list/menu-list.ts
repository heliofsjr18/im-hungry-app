import { Component } from '@angular/core';
import { style, state, animate, transition, trigger } from '@angular/animations';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IonicPage, NavController, NavParams, Platform, MenuController, LoadingController } from 'ionic-angular';
import { MenuDetailPage } from '../menu-detail/menu-detail';
import { CarrinhoPage } from '../carrinho/carrinho';
import { CarrinhoProvider } from '../../providers/carrinho/carrinho';
import { RestClientProvider } from '../../providers/rest-client/rest-client';
import $ from "jquery";

@IonicPage()
@Component({
  selector: 'page-menu-list',
  templateUrl: 'menu-list.html',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({transform: 'translateX(100%)', opacity: 0}),
        animate('150ms', style({transform: 'translateX(0)', opacity: 1}))
      ]),
      transition(':leave', [
        style({transform: 'translateX(0)', opacity: 1}),
        animate('150ms', style({transform: 'translateX(100%)', opacity: 0}))
      ])
    ])
  ]
})
export class MenuListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform,
  private menuCtrl: MenuController, private carrinho: CarrinhoProvider, private restClient: RestClientProvider,
  private loadingCtrl: LoadingController, private http: HttpClient) {
  }

  ionViewDidLoad() {
    if(this.platform.is('ios')){
      setTimeout(()=>{
        //Texto do botão voltar no ios.
        $(".back-button-text").text("");
      },100);
    }

    this.loadList();
  }

  showSearch: boolean = false;
  searchTerm: string = '';
  //Deve ser implementado aqui a recepção do objeto Json que virá do web service e distribuição do objeto no Array abaixo

  data = [];

  onScroll(){
     
  }

  getTotalCarrinho(){
    return this.carrinho.getCountCarrinho();
  }

  toggleSearch(){
    this.showSearch = !this.showSearch;
  }

  clickSearch(){
    this.toggleSearch();
    
    setTimeout(()=>{
      $(".searchbar-ios-cancel > .button-inner").text("Cancelar");
    },100);
    
  }

  loadList(){
    
    let loading = this.loadingCtrl.create({
      spinner: 'crescent'
    });

    loading.present();

    this.getMenuItems().then(data => {
      this.data = [];

      var obj = JSON.parse(data.toString());
      var items = obj.menu;
      console.log(items);

      for(let i in items){
        this.data.push({name: items[i].item_nome,
          description: '',
          image: 'https://rafafreitas.com/api/uploads/itens/' + items[i].fotos[0].fot_file,
          rate: 4.5,
          price: 'R$ ' + parseFloat(items[i].item_valor).toFixed(2),
          id: items[i].item_id
        });
      }
      this.restClient.Token = obj.token;

      loading.dismiss();
    });
  }

  onCancel(event){
    this.toggleSearch();
  }

  openFilterMenu(){
    this.menuCtrl.open("filtersMenu");
  }

  openCart() : void{
    this.navCtrl.push(CarrinhoPage);
  }

  navegateToDetail(): void {
    this.navCtrl.push(MenuDetailPage);
  }

  onSearchTermChanged(){
    this.loadList();
  }

  onClearSearch(){
    this.searchTerm = '';
    this.loadList();
  }

  getMenuItems(){
    let token = this.restClient.Token;

    let body = {
      "search": this.searchTerm,
      "filial_id": this.navParams.data
    }

    return new Promise(resolve => {
      this.http.post("https:api.rafafreitas.com/app/menu/list", body, {
        headers: new HttpHeaders().set('Authorization', token)
      })
      .subscribe(res => {
        resolve(JSON.stringify(res));
      }, (err) => {
        console.log(err);
      });
    });
  }
}
