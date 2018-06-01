import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Platform, MenuController, Nav, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FCM } from '@ionic-native/fcm';

import fontawesome from '@fortawesome/fontawesome';
import faFreeSolid from '@fortawesome/fontawesome-free-solid';
import faFreeRegular from '@fortawesome/fontawesome-free-regular';
import faFreeBrands from '@fortawesome/fontawesome-free-brands';

import { HomePage } from '../pages/home/home';
import { EstabelecimentoListPage } from '../pages/estabelecimento-list/estabelecimento-list';
import { LoginPage } from '../pages/login/login';
import { MenuFilterProvider } from '../providers/menu-filter/menu-filter';
import { CartaoFidelidadePage } from '../pages/cartao-fidelidade/cartao-fidelidade';

import { UsuarioProvider } from '../providers/usuario/usuario';
import { PedidosPage } from '../pages/pedidos/pedidos';
import { RegisterPage } from '../pages/register/register';
import { FormasPagamentoPage } from '../pages/formas-pagamento/formas-pagamento';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LoginPage;
  @ViewChild('myContent') content: Nav;
  //Filtros da listagem de estabelecimentos
  estabList_Filters = {
    apenasProximos: false,
    apenasFidelidade: false
  };

  usuario: any  = {user_nome: ''};
  userDefaultImage = 'assets/imgs/user-default.jpg';

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private menuCtrl: MenuController, private fcm: FCM, private menuFilter: MenuFilterProvider, private userProvider: UsuarioProvider,
    private alertCtrl: AlertController, private detector: ChangeDetectorRef) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.menuCtrl.get('main_Menu').ionOpen.subscribe(() => {
        this.usuario = this.userProvider.getUserObject();
        if(this.usuario.user_foto_perfil){
          this.userDefaultImage = this.usuario.user_foto_perfil;
        }
        this.detector.detectChanges();
      });
      // Init Plugins
      this.initFontAwesome();
      this.initFCM();
      // Init All Menu Filters
      this.initMenuFilters();
    });
  }

  //Carregar todos os filtros aqui
  initMenuFilters(){
    // Init estabelecimento-list Filters 
    this.estabList_Filters = this.menuFilter.getEstabListFilters();
  }

  mainLogOut(){
    this.closeMenu("main_Menu")
    this.userProvider.userLogout();
    this.content.setRoot(LoginPage);
  }

  mainMeusPedidos(){
    this.closeMenu("main_Menu");
    this.content.push(PedidosPage);
  }

  mainMinhaConta(){
    this.closeMenu("main_Menu");
    this.content.push(RegisterPage);
  }

  mainFomasPagamento(){
    this.closeMenu("main_Menu");
    this.content.push(FormasPagamentoPage);
  }

  /**
   * Atualizar os filtros do menu de várias páginas, mandar id do menu como parâmetro.
   * 
   */
  updateMenuFilters(id: string){
    // Update estabelecimento-list Filters
    if(id === 'filtersMenu_Estab'){
      this.menuFilter.setEstabListFilters(this.estabList_Filters);
      this.closeMenu(id);
    }
    
  }

  initFCM(){

    this.fcm.onNotification().subscribe(data => {
      if(data.wasTapped) {
       //console.info("Received in background");
      } else {
        console.log(data);
        this.showAlert(data);
       //console.info("Received in foreground");
      };
    });
  }

  showAlert(data){
    let alert = this.alertCtrl.create({
      title: data.title,
      message: data.body,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            
          }
        }
      ]
    });
    alert.present();
  }

  showToken(token){
    alert(token);
  }

  initFontAwesome(){
    fontawesome.library.add(faFreeSolid);
    fontawesome.library.add(faFreeRegular);
    fontawesome.library.add(faFreeBrands);
  }

  closeMenu(id: string){
    this.menuCtrl.get(id).close();
  }
}

