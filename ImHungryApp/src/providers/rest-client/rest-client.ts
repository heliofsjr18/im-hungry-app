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
  public Token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1MjE1MTY1NzUsImp0aSI6IlBpVCtaZGt6T1lNTCt2TCttZVRxUFczQjRMeDZBdFwvVGVEbTVzdHA2d0wwPSIsImlzcyI6Imh0dHA6XC9cL3JhZmFmcmVpdGFzLmNvbVwvIiwibmJmIjoxNTIxNTE2NTg1LCJleHAiOjE1MjE2MDI5ODUsImRhdGEiOnsidXNlcl9pZCI6IjEiLCJ1c2VyX25vbWUiOiJNYXRoZXVzIiwidXNlcl9jcGYiOiIxMDEyNDk0NDQ2OSIsInVzZXJfZW1haWwiOiJ0ZXN0ZUB0ZXN0ZS5jb20iLCJ1c2VyX3RlbGVmb25lIjoiODEzMzcyNjI0OSIsInVzZXJfZGF0YSI6IjIwMTgtMDMtMDUiLCJ1c2VyX2NhZGFzdHJvIjoiMjAxOC0wMy0wNSAwMDowMDowMCIsInVzZXJfZm90b19wZXJmaWwiOm51bGwsInVzZXJfc3RhdHVzIjoiMSIsInRpcG9faWQiOiIxIiwiZGF0ZUFuaXZlcnNhcmlvIjoiMDVcLzAzXC8yMDE4IiwiZGF0ZUNhZGF0cm8iOiIwNVwvMDNcLzIwMTgifX0.yrjt7myqe8ozzA9r5BQ2twdzWm4wxrNSBe-WPou1mSo';
}
