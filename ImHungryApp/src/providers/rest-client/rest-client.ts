import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RestClientProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestClientProvider {

  constructor(public http: HttpClient) {
    console.log('Hello RestClientProvider Provider');
  }

  public Server = 'http://api.rafafreitas.com/';
  public ApiUrl = 'api/';
  public ServerWithApiUrl = this.Server + this.ApiUrl;
}
