import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestClientProvider } from '../rest-client/rest-client';

/*
  Generated class for the LoginServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LoginServiceProvider {

  constructor(public http: HttpClient, private rest: RestClientProvider) {
    console.log('Hello LoginServiceProvider Provider');
  }



  //HFSJ - Tirando as chamadas de serviço externo das telas
  public getLoginRest(url: string, bodyJson) {
    return this.rest.getLoginJson(url, bodyJson);
  }
}
