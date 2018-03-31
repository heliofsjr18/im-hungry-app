import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule} from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

//Pages
import { HomePage } from '../pages/home/home';
import { EstabelecimentoListPage } from '../pages/estabelecimento-list/estabelecimento-list';
import { MenuListPage } from '../pages/menu-list/menu-list';
import { CarrinhoPage } from '../pages/carrinho/carrinho';
import { PagamentoPage } from '../pages/pagamento/pagamento';
import { MenuDetailPage } from '../pages/menu-detail/menu-detail';
import { LoginPage } from '../pages/login/login';


//Components
import { IonRatingComponent } from '../components/ion-rating/ion-rating';
import { EstabelecimentoServiceProvider } from '../providers/estabelecimento-service/estabelecimento-service';
import { RestClientProvider } from '../providers/rest-client/rest-client';
import { CarrinhoProvider } from '../providers/carrinho/carrinho';
import { PagSeguroProvider } from '../providers/pag-seguro/pag-seguro';
import { LoginServiceProvider } from '../providers/login-service/login-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EstabelecimentoListPage,
    MenuListPage,
    CarrinhoPage,
    PagamentoPage,
    IonRatingComponent,
    MenuDetailPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    EstabelecimentoListPage,
    CarrinhoPage,
    PagamentoPage,
    MenuListPage,
    MenuDetailPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EstabelecimentoServiceProvider,
    RestClientProvider,
    CarrinhoProvider,
    PagSeguroProvider,
    LoginServiceProvider
  ]
})
export class AppModule {}
