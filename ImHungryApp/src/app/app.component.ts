import { Component } from '@angular/core';
import { Platform, MenuController } from 'ionic-angular';
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

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LoginPage;

  //Filtros da listagem de estabelecimentos
  estabList_Filters = {
    apenasProximos: false,
    apenasFidelidade: false
  };

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private menuCtrl: MenuController, private fcm: FCM, private menuFilter: MenuFilterProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
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
    //this.fcm.subscribeToTopic('all');
    //this.fcm.subscribeToTopic('com.br.ImHungryApp-2');
    /*this.fcm.getToken().then(token => {
      // backend.registerToken(token);
      this.showToken(token);
      console.log(token);
    });
    
    this.fcm.onTokenRefresh().subscribe(token => {
      this.showToken(token);
      console.log(token);
    });*/

    this.fcm.onNotification().subscribe(data => {
      alert('message received')
      if(data.wasTapped) {
       console.info("Received in background");
      } else {
       console.info("Received in foreground");
      };
    });
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

