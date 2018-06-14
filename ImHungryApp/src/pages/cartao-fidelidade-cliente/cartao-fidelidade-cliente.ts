import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, ToastController } from 'ionic-angular';
import { CartaoFidelidadePage } from '../cartao-fidelidade/cartao-fidelidade';
import { RestClientProvider } from '../../providers/rest-client/rest-client';

/**
 * Generated class for the CartaoFidelidadeClientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cartao-fidelidade-cliente',
  templateUrl: 'cartao-fidelidade-cliente.html',
})
export class CartaoFidelidadeClientePage {

  data = [];
  cartaoFidelidadeList = [];

  loading: Loading;
  

  constructor(public navCtrl: NavController, public navParams: NavParams,  private loadingCtrl: LoadingController,
    private rest: RestClientProvider,
    private toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartaoFidelidadeClientePage');
    this.getFidelidade();
  }

  

  openCardDetail(item){
    
    this.navCtrl.push(CartaoFidelidadePage, {
      image: item.foto_filial_fidelidade,
      name: item.nome_filial_fidelidade
      
    });
  }
  

  getFidelidade(){
    let load = this.showLoading();

    this.rest.getJson('fidelidade/list').then((data) => {
      let obj = JSON.parse(data.toString());

      let list = obj.fidelidade;

      for(let i in list){
        
        this.cartaoFidelidadeList.push({
          foto_filial_fidelidade: "https://api.rafafreitas.com/uploads/empresa/" + list[i].foto_filial,
          nome_filial_fidelidade: list[i].nome_filial,
          pontos_conquistados_fidelidade: list[i].pontos_conquistados,
          pontos_necessarios_fidelidade: list[i].pontos_necessarios,
          requisito_valor_fidelidade: list[i].requisito_valor
        });
      }
      console.log(this.cartaoFidelidadeList);
      console.log(obj);
      this.closeLoading(load);
    }, (error) => {
      console.log(error);
      this.closeLoading(load);
    }).catch((error) => {
      console.log(error);
      this.closeLoading(load);
    });
  }


  closeLoading(loading: Loading){
    loading.dismiss();
  }

  showLoading(): Loading{
    let loading = this.loadingCtrl.create({
      content: `<div class="loading">
                  <div class="loading-center">
                    <div class="loading-center-absolute">
                      <div class="loading-object loading-object-four" id="object_four"></div>
                      <div class="loading-object loading-object-three" id="object_three"></div>
                      <div class="loading-object loading-object-two" id="object_two"></div>
                      <div class="loading-object loading-object-one" id="object_one"></div>
                    </div>
                  </div>
                </div>`,
      spinner: 'hide',
      cssClass: 'my-loading-class'
    });

    loading.present();
    return loading;
  }


  loadList(){
    this.showLoading();

    this.rest.getJson('fidelidade/list').then((data) => {
      this.cartaoFidelidadeList = [];      
      let object = JSON.parse(data.toString());
      // for(let i in object.cartões){
      //   this.cartaoFidelidadeList.push({
      //     cartao_id: object.cartões[i].cartao_id,
      //     cartao_digitos: object.cartões[i].cartao_digitos.substring(12, 16),
      //     cartao_ano: object.cartões[i].cartao_ano.substring(2,4),
      //     cartao_mes: object.cartões[i].cartao_mes,
      //     cartao_brand: object.cartões[i].cartao_brand,
      //     cartao_status: object.cartões[i].cartao_status,
      //     cartao_cvc: ''
      //   });
      // }
      console.log(object);
      this.dimissLoading();
    })
    .catch((error) => {
      console.log(error);
      this.showToast('Erro ao obter as formas de pagamento.');
      this.dimissLoading();
    });
  }

  showToast(message){
    let toast = this.toastCtrl.create({
      message: message,
      duration: 1500,
      position: 'top'
    });
  }
  dimissLoading(){
    if(this.loading){
      this.loading.dismiss();
    }
  }

  


}
