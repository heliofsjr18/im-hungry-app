import { HttpClient } from '@angular/common/http';
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

  //constructor(public http: HttpClient) {
  //  console.log('Hello EstabelecimentoServiceProvider Provider');
  //}
  private actionUrl: string;

  constructor(private http: HttpClient, private _configuration: RestClientProvider) {
    this.actionUrl = _configuration.ServerWithApiUrl + 'values/';
  }


  public getAll<T>(): Observable<T> {
    return this.http.get<T>(this.actionUrl);
  }

  public getSingle<T>(id: number): Observable<T> {
    return this.http.get<T>(this.actionUrl + id);
  }

  public add<T>(itemName: string): Observable<T> {
    const toAdd = JSON.stringify({ ItemName: itemName });

    return this.http.post<T>(this.actionUrl, toAdd);
  }

  public update<T>(id: number, itemToUpdate: any): Observable<T> {
    return this.http
      .put<T>(this.actionUrl + id, JSON.stringify(itemToUpdate));
  }

  public delete<T>(id: number): Observable<T> {
    return this.http.delete<T>(this.actionUrl + id);
  }
}
