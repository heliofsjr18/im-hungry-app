import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RestClientProvider } from '../rest-client/rest-client';

/*
  Generated class for the EstabelecimentoServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EstabelecimentoServiceProvider {
  searchTerm: string = '';


  //constructor(public http: HttpClient) {
  //  console.log('Hello EstabelecimentoServiceProvider Provider');
  //}
  private actionUrl: string;


  constructor(private http: HttpClient, private _configuration: RestClientProvider) {
    this.actionUrl = _configuration.ServerWithApiUrl + 'values/';
  }


  //HFSJ - Tirando as chamadas de serviço externo das telas
  public getEstabelecimentos() {

    let Token = this._configuration.Token;
    var items;
    var obj;

    let body = {
      'latitude': '-8.0282236',
      'longitude': '-34.8855557',
      'search': this.searchTerm
    }

    var dataEstabelecimentos = new Promise(resolve => {
      //HFSJ - Esse trecho não deve conter parametros Hard Code
      this.http.post("https://api.rafafreitas.com/app/filial/list", body, {
        headers: new HttpHeaders().set('Authorization', Token)
      })
        .subscribe(res => {
          resolve(JSON.stringify(res));
        }, (err) => {
          console.log(err);
        });
    });

    dataEstabelecimentos.then(data => {
      obj = JSON.parse(data.toString());
      items = obj.filiais;
    });

    return items;
  }
}
