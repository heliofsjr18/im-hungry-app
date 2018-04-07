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
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    private menuCtrl: MenuController, private fcm: FCM) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.initFontAwesome();
      this.initFCM();
    });
  }

  initFCM(){
    this.fcm.subscribeToTopic('all');
    this.fcm.getToken().then(token => {
      // backend.registerToken(token);
      alert(token);
    });
    this.fcm.onNotification().subscribe(data => {
      alert('message received')
      if(data.wasTapped) {
       console.info("Received in background");
      } else {
       console.info("Received in foreground");
      };
    });
    this.fcm.onTokenRefresh().subscribe(token => {
      // backend.registerToken(token);
    });
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

