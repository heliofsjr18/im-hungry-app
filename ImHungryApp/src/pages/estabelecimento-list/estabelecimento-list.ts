import { Component, ChangeDetectorRef, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { style, state, animate, transition, trigger } from '@angular/animations';
import { IonicPage, NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
import { MenuListPage } from '../menu-list/menu-list';
import { CarrinhoPage } from '../carrinho/carrinho';
import { CarrinhoProvider } from '../../providers/carrinho/carrinho';
import $ from "jquery";

@IonicPage()
@Component({
  selector: 'page-estabelecimento-list',
  templateUrl: 'estabelecimento-list.html',
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
  ],
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class EstabelecimentoListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private detector: ChangeDetectorRef,
    private elRef: ElementRef, private menuCtrl: MenuController, private carrinho: CarrinhoProvider,
    private loadingCtrl: LoadingController) {
  }

  data = [];

  showSearch: boolean = false;
  totalCarrinho: string = '';

  toggleSearch(){
    this.showSearch = !this.showSearch;
  }

  getTotalCarrinho(){
    return  this.carrinho.getCountCarrinho();
  }

  clickSearch(){
    this.toggleSearch();
    
    setTimeout(()=>{
      $(".searchbar-ios-cancel > .button-inner").text("Cancelar");
    },100);
    
  }

  openCart() : void{
    this.navCtrl.push(CarrinhoPage);
  }

  onCancel(event){
    this.toggleSearch();
  }

  loadList(){

    let loading = this.loadingCtrl.create({
      spinner: 'crescent'
    });

    loading.present();

    setTimeout(()=>{
      loading.dismiss();

      this.data = [
        {name: 'Pizza Hut', description: 'Pizza Hut da Favela', image: '/assets/imgs/test-logo.png', rate: 2.5, distance: '2,5 Km' , status: 1},
        {name: 'Pizza Hut', description: 'Pizza Hut Boa Viagem', image: '/assets/imgs/test-logo.png', rate: 3.5, distance: '3,5 Km', status: 0},
        {name: 'Pizza Hut', description: 'Pizza Hut da Favela', image: '/assets/imgs/test-logo.png', rate: 1.5, distance: '1,5 Km', status: 1},
        {name: 'Pizza Hut', description: 'Pizza Hut Boa Viagem', image: '/assets/imgs/test-logo.png', rate: 4, distance: '4 Km', status: 0},
        {name: 'Pizza Hut', description: 'Pizza Hut da Favela', image: '/assets/imgs/test-logo.png', rate: 5, distance: '5 Km', status: 1}
      ];

    }, 1500);
  }

  ionViewDidLoad() {
    this.loadList();
  }

  ionViewDidEnter(){
    
  }

  ngOnInit(){
    
  }
  
  openFilterMenu(){
    this.menuCtrl.open("filtersMenu");
  }

  navigateToMenuPage(){
    this.navCtrl.push(MenuListPage);
  }

  doRefresh(refresher){
    setTimeout(()=>{
      refresher.complete();
    }, 3000);
  }

  onScroll(){
    //this.detector.markForCheck();
  }

  logStars(event){
    console.log(event);
  }
}
