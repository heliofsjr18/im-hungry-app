import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class RestClientProvider {

  constructor(public http: HttpClient) {
    console.log('Hello RestClientProvider Provider');
  }

  public getPostJson(url: string, bodyJson){
    return new Promise((resolve, reject) => {
      this.http.post(this.Server + this.ApiUrl + url, bodyJson, {
        headers: new HttpHeaders().set('Authorization', this.Token)
      })
      .subscribe(res => {
        resolve(JSON.stringify(res));
      }, (err) => {
        reject(JSON.stringify(err));
      });
    });
  }

  public getJson(url: string){
    return new Promise((resolve, reject) => {
      this.http.get(this.Server + this.ApiUrl + url, {
        headers: new HttpHeaders().set('Authorization', this.Token)
      })
      .subscribe(res => {
        resolve(JSON.stringify(res));
      }, (err) => {
        reject(JSON.stringify(err));
      });
    })
  }

  public getLoginJson(){
    
  }

  public Server = 'http://api.rafafreitas.com/';
  public ApiUrl = 'app/';
  public ServerWithApiUrl = this.Server + this.ApiUrl;
  public Token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1MjE4NDQ2MTcsImp0aSI6Ik9uT3RSYkZkaUFzNHZ6UzN5cG42Q1pNVmRjRnFKTDNcL1VXVGtzazBTcUpNPSIsImlzcyI6Imh0dHA6XC9cL3JhZmFmcmVpdGFzLmNvbVwvIiwibmJmIjoxNTIxODQ0NjI3LCJleHAiOjE1MjE5MzEwMjcsImRhdGEiOnsidXNlcl9pZCI6IjEiLCJ1c2VyX25vbWUiOiJNYXRoZXVzIiwidXNlcl9jcGYiOiIxMDEyNDk0NDQ2OSIsInVzZXJfZW1haWwiOiJ0ZXN0ZUB0ZXN0ZS5jb20iLCJ1c2VyX3RlbGVmb25lIjoiODEzMzcyNjI0OSIsInVzZXJfZGF0YSI6IjIwMTgtMDMtMDUiLCJ1c2VyX2NhZGFzdHJvIjoiMjAxOC0wMy0wNSAwMDowMDowMCIsInVzZXJfZm90b19wZXJmaWwiOm51bGwsInVzZXJfc3RhdHVzIjoiMSIsInRpcG9faWQiOiIxIiwiZGF0ZUFuaXZlcnNhcmlvIjoiMDVcLzAzXC8yMDE4IiwiZGF0ZUNhZGFzdHJvIjoiMDVcLzAzXC8yMDE4In19.4Zy-t0QWibWrBrBf4xwP3X5ZD6GY943iB0QNuCOPO-I';
}
