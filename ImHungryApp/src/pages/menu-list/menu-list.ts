import { Component } from '@angular/core';
import { style, state, animate, transition, trigger } from '@angular/animations';
import { IonicPage, NavController, NavParams, Platform, MenuController } from 'ionic-angular';
import { MenuDetailPage } from '../menu-detail/menu-detail';
import { CarrinhoPage } from '../carrinho/carrinho';
import { CarrinhoProvider } from '../../providers/carrinho/carrinho';
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
  private menuCtrl: MenuController, private carrinho: CarrinhoProvider) {
  }

  ionViewDidLoad() {
    if(this.platform.is('ios')){
      setTimeout(()=>{
        //Texto do botão voltar no ios.
        $(".back-button-text").text("");
      },100);
    }
  }

  showSearch: boolean = false;

  //Deve ser implementado aqui a recepção do objeto Json que virá do web service e distribuição do objeto no Array abaixo

  data = [
    {name: 'Sushi', description: 'Pizza Hut da Favela', image: '/assets/imgs/test-prato.png', rate: 2.5, price: 'R$ 1329,90' , status: 1},
    {name: 'Sushi', description: 'Pizza Hut Boa Viagem', image: '/assets/imgs/test-prato.png', rate: 3.5, price: 'R$ 129,90', status: 0},
    {name: 'Sushi', description: 'Pizza Hut da Favela', image: '/assets/imgs/test-prato.png', rate: 1.5, price: 'R$ 129,90', status: 1},
    {name: 'Sushi', description: 'Pizza Hut Boa Viagem', image: '/assets/imgs/test-prato.png', rate: 4, price: 'R$ 129,90', status: 0},
    {name: 'Sushi', description: 'Pizza Hut da Favela', image: '/assets/imgs/test-prato.png', rate: 5, price: 'R$ 129,90', status: 1}
  ];

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
}
