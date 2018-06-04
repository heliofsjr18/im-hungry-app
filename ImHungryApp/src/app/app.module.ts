import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule} from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Facebook } from '@ionic-native/facebook';
import { Geolocation } from '@ionic-native/geolocation';
import { FCM } from '@ionic-native/fcm';
import { GooglePlus } from '@ionic-native/google-plus';
import { IonicStorageModule } from '@ionic/storage';
import { Diagnostic } from '@ionic-native/diagnostic';
import { ImagePicker } from '@ionic-native/image-picker';
import { Camera } from '@ionic-native/camera';

import { MyApp } from './app.component';

//Pages
import { HomePage } from '../pages/home/home';
import { EstabelecimentoListPage } from '../pages/estabelecimento-list/estabelecimento-list';
import { MenuListPage } from '../pages/menu-list/menu-list';
import { CarrinhoPage } from '../pages/carrinho/carrinho';
import { PagamentoPage } from '../pages/pagamento/pagamento';
import { MenuDetailPage } from '../pages/menu-detail/menu-detail';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { CartaoFidelidadePage } from '../pages/cartao-fidelidade/cartao-fidelidade';
import { PedidosPage } from '../pages/pedidos/pedidos';
import { CartaoFidelidadeClientePage } from '../pages/cartao-fidelidade-cliente/cartao-fidelidade-cliente';

//Components
import { IonRatingComponent } from '../components/ion-rating/ion-rating';
import { AccordionComponent } from '../components/accordion/accordion';

//Providers
import { EstabelecimentoServiceProvider } from '../providers/estabelecimento-service/estabelecimento-service';
import { RestClientProvider } from '../providers/rest-client/rest-client';
import { CarrinhoProvider } from '../providers/carrinho/carrinho';
import { PagSeguroProvider } from '../providers/pag-seguro/pag-seguro';
import { LoginServiceProvider } from '../providers/login-service/login-service';
import { UsuarioProvider } from '../providers/usuario/usuario';
import { MenuFilterProvider } from '../providers/menu-filter/menu-filter';
import { FormasPagamentoPage } from '../pages/formas-pagamento/formas-pagamento';
import { FormaPagamentoDetailPage } from '../pages/forma-pagamento-detail/forma-pagamento-detail';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    EstabelecimentoListPage,
    MenuListPage,
    CarrinhoPage,
    PagamentoPage,
    IonRatingComponent,
    AccordionComponent,
    MenuDetailPage,
    LoginPage,
    RegisterPage,
    CartaoFidelidadePage,
    PedidosPage,
    CartaoFidelidadeClientePage,
    FormaPagamentoDetailPage,
    FormasPagamentoPage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp, {
      monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                   'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      monthShortNames: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
      dayShortNames: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
    }),
    HttpClientModule,
    IonicStorageModule.forRoot()
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
    LoginPage,
    RegisterPage,
    CartaoFidelidadePage,
    PedidosPage,
    CartaoFidelidadeClientePage,
    FormaPagamentoDetailPage,
    FormasPagamentoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EstabelecimentoServiceProvider,
    RestClientProvider,
    CarrinhoProvider,
    PagSeguroProvider,
    LoginServiceProvider,
    UsuarioProvider,
    MenuFilterProvider,
    ImagePicker,
    Camera,
    Diagnostic,
    Facebook,
    GooglePlus,
    Geolocation,
    FCM
  ]
})
export class AppModule {}
