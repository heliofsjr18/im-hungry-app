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

  checkOutList = [];

  ionViewDidLoad(){
    this.getPedidos();
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
    let load = this.showLoading();

    this.rest.getJson('checkout').then((data) => {
      let obj = JSON.parse(data.toString());

      let list = obj.checkouts;

      for(let i in list){

        let checkout_itens = [];
        for(let j in list[i].itens){
          checkout_itens.push({
            item_nome: list[i].itens[j].item_nome,
            item_qtd: list[i].itens[j].checkout_item_qtd,
            item_valor: list[i].itens[j].checkout_item_valor,
            item_foto: 'https://api.rafafreitas.com/uploads/itens/' + list[i].itens[j].fotos[0].fot_file 
          });
        }
        this.checkOutList.push({
          filial_logo: "https://api.rafafreitas.com/uploads/empresa/" + list[i].empresa_foto_marca,
          filial_nome: list[i].filial_nome,
          checkout_ref: list[i].checkout_ref,
          checkout_code: '#' + list[i].checkout_ref.substring(8, 13),
          checkout_date: list[i].checkout_date,
          checkout_flag_desc: list[i].checkout_flag_desc,
          checkout_valor_bruto: list[i].checkout_valor_bruto,
          itens: checkout_itens
        });
      }
      //console.log(this.checkOutList);
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

}
