import { Component, ChangeDetectorRef, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { style, animate, transition, trigger } from '@angular/animations';
import { Geolocation } from '@ionic-native/geolocation';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, Platform, AlertController } from 'ionic-angular';
import { MenuListPage } from '../menu-list/menu-list';
import { CarrinhoPage } from '../carrinho/carrinho';
import { CarrinhoProvider } from '../../providers/carrinho/carrinho';
import { MenuFilterProvider } from '../../providers/menu-filter/menu-filter';
import { RestClientProvider } from '../../providers/rest-client/rest-client';
import { EstabelecimentoServiceProvider } from '../../providers/estabelecimento-service/estabelecimento-service';
import $ from "jquery";
import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-estabelecimento-list',
  templateUrl: 'estabelecimento-list.html',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('150ms', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)', opacity: 1 }),
        animate('150ms', style({ transform: 'translateX(100%)', opacity: 0 }))
      ])
    ])
  ],
})
export class EstabelecimentoListPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private detector: ChangeDetectorRef,
    private elRef: ElementRef, private menuCtrl: MenuController, private carrinho: CarrinhoProvider, private estabelecimentoServiceProvider: EstabelecimentoServiceProvider,
    private loadingCtrl: LoadingController, private http: HttpClient, private restClient: RestClientProvider,
    private geolocation: Geolocation, private menuFilter: MenuFilterProvider, private platform: Platform, private alertCtrl: AlertController) {

      platform.registerBackButtonAction(() => {
        this.showLogoutAlert();
      });
      this.getMenuEvents();
  }

  searchTerm: string = '';
  showSearch: boolean = false;
  totalCarrinho: string = '';
  data = []; 

  showLogoutAlert(){
    let alert = this.alertCtrl.create({
      title: 'LogOut',
      message: 'Se sair terá de fazer login novamente. Tem certeza?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancelar'
        },
        {
          text: 'Confirmar',
          role: 'confirmar',
          handler: () => {
            this.navCtrl.setRoot(LoginPage);
          }
        }
      ]
    });
  }

  getMenuEvents(){
    this.menuCtrl.get('filtersMenu_Estab').ionClose.subscribe(() => {
      this.loadList(false, true);
    });
  }

  toggleSearch() {
    this.showSearch = !this.showSearch;
  }

  getTotalCarrinho() {
    return this.carrinho.getCountCarrinho();
  }

  clickSearch() {
    this.toggleSearch();

    setTimeout(() => {
      $(".searchbar-ios-cancel > .button-inner").text("Cancelar");
    }, 100);

  }

  openCart(): void {
    this.navCtrl.push(CarrinhoPage);
  }

  onCancel(event) {
    this.toggleSearch();
  }

  loadList(isRefresh: boolean, refresher) {

    let loading = this.loadingCtrl.create({
      spinner: 'crescent'
    });

    if (!isRefresh) {
      loading.present();
    }

    this.geolocation.getCurrentPosition().then((resp) => {

      let filters = this.menuFilter.getEstabListFilters();

      let body = {
        'latitude': resp.coords.latitude.toString(),
        'longitude' : resp.coords.longitude.toString(),
        'search': this.searchTerm,
        'onlyNear': filters.apenasProximos ? 1 : 2,
        'onlyFidelidade': filters.apenasFidelidade ? 1 : 2
      }
  
      console.log(body);

      this.estabelecimentoServiceProvider.getEstabelecimentos('filial/list', body)
      .then((data)=>{
        this.data = [];
        let parseObj = JSON.parse(data.toString());
        let listItem = parseObj.filiais;

        for (let i in listItem) {
          this.data.push({
            name: listItem[i].filial_nome,
            description: listItem[i].logradouro + ', ' + listItem[i].filial_numero_endereco + ', ' + listItem[i].bairro + ', ' + listItem[i].cidade,
            image: "https://rafafreitas.com/api/uploads/empresa/" + listItem[i].empresa_foto_marca,
            rate: parseFloat(listItem[i].avaliacao),
            distance: parseFloat(listItem[i].distancia).toFixed(2) + ' Km',
            status: parseInt(listItem[i].filial_status),
            id: parseInt(listItem[i].filial_id)
          });
        }

        if (isRefresh) {
          refresher.complete();
        } else {
          loading.dismiss();
        }
      })
      .catch((rej) =>{
        this.data = [];
        console.log(rej);
        if(!isRefresh){
          loading.dismiss();
        }else{
          refresher.complete();
        }
      });
    })
    .catch((error) => {
      console.log('ERRO AO OBTER LOCALIZAÇÃO', error);
    }); 
  }

  ionViewDidLoad() {
    this.loadList(false, null);
  }

  onSearchChanged() {
    this.loadList(false, null);
  }

  onClearSearch() {
    if (this.searchTerm.length > 1) {
      this.searchTerm = '';
      this.loadList(false, null);
    }
  }

  openFilterMenu() {
    this.menuCtrl.enable(true, "filtersMenu_Estab");
    this.menuCtrl.open("filtersMenu_Estab");
  }

  navigateToMenuPage(item) {
    this.navCtrl.push(MenuListPage, {
      filial_id: item.id,
      filial_nome: item.name
    });
  }

  doRefresh(refresher) {
    this.loadList(true, refresher);
  }

  onScroll() {
    //this.detector.markForCheck();
  }

  logStars(event) {
    console.log(event);
  }
}
