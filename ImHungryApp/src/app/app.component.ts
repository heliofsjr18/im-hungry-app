import { Component } from '@angular/core';
import { Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Push, PushObject, PushOptions } from '@ionic-native/push';

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
    private menuCtrl: MenuController, private push: Push) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.initFontAwesome();
      this.initPushNotifications();
    });
  }

  initPushNotifications(){
    this.push.hasPermission().then((res) => {
      if(res.isEnabled){
        console.log('PERMISSÃO PARA PUSH NOTIFICATIONS CONCEDIDA');

        const options: PushOptions = {
          android: {},
          ios: {
              alert: 'true',
              badge: true,
              sound: 'false'
          },
          windows: {},
          browser: {
              pushServiceURL: 'http://push.api.phonegap.com/v1/push'
          }
       };

       const pushObject: PushObject = this.push.init(options);

       pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));

        pushObject.on('registration').subscribe((registration: any) => console.log('Device registered', registration));

        pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));

      }else{
        console.log('SEM PERMISSÕES PARA PUSH NOTIFICATIONS');
      }
    }).catch((error) => {
      console.info(error);
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

