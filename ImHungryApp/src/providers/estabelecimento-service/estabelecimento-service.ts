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

  constructor(private http: HttpClient, private rest: RestClientProvider) {
    
  }


  //HFSJ - Tirando as chamadas de serviço externo das telas
  public getEstabelecimentos(url: string, bodyJson) {
    return this.rest.getPostJson(url, bodyJson);
  }
}
