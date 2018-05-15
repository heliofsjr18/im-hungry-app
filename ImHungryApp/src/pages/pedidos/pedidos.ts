import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { RestClientProvider } from '../../providers/rest-client/rest-client';

@IonicPage()
@Component({
  selector: 'page-pedidos',
  templateUrl: 'pedidos.html',
})
export class PedidosPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private rest: RestClientProvider,
    private loadingCtrl: LoadingController) {
  }

  data = [{image: 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png', filial: 'FOOD TRUCK DO LUNA', status: '#12345 - Pago', time: '15/05 15:18'}];

  ionViewDidLoad(){
  }

  showLoading(): Loading{
    let loading = this.loadingCtrl.create({
      spinner: 'crescent'
    });

    loading.present();
    return loading;
  }

  closeLoading(loading: Loading){
    loading.dismiss();
  }

  getPedidos(){
    
  }

}
