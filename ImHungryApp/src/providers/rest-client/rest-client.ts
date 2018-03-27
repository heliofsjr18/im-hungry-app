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

  public getLoginJson(bodyJson, url: string) {

    return new Promise((resolve, reject) => {
      this.http.post(this.Server + this.ApiUrl + url, bodyJson)
        .subscribe(res => {
          resolve(JSON.stringify(res));
        }, (err) => {
          reject(JSON.stringify(err));
        });
    });

  }

  public Server = 'http://api.rafafreitas.com/';
  public ApiUrl = 'app/';
  public ServerWithApiUrl = this.Server + this.ApiUrl;
  public Token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1MjIwOTExNjQsImp0aSI6IitHa2F5TjVPeFVGWjNDcUoxWlFJdEtHdDdBcTdDWG5KMXNoRHUrajk4dlU9IiwiaXNzIjoiaHR0cDpcL1wvcmFmYWZyZWl0YXMuY29tXC8iLCJuYmYiOjE1MjIwOTExNzQsImV4cCI6MTUyMjE3NzU3NCwiZGF0YSI6eyJ1c2VyX2lkIjoiMSIsInVzZXJfbm9tZSI6Ik1hdGhldXMgR3VpbGhlcm1lIiwidXNlcl9jcGYiOiIxMDEyNDk0NDQ2OSIsInVzZXJfZW1haWwiOiJ0ZXN0ZUB0ZXN0ZS5jb20iLCJ1c2VyX3RlbGVmb25lIjoiODEzMzcyNjI0OSIsInVzZXJfZGF0YSI6IjIwMTgtMDMtMDUiLCJ1c2VyX2NhZGFzdHJvIjoiMjAxOC0wMy0wNSAwMDowMDowMCIsInVzZXJfZm90b19wZXJmaWwiOm51bGwsInVzZXJfc3RhdHVzIjoiMSIsInRpcG9faWQiOiIxIiwiZGF0ZUFuaXZlcnNhcmlvIjoiMDVcLzAzXC8yMDE4IiwiZGF0ZUNhZGFzdHJvIjoiMDVcLzAzXC8yMDE4In19.XD8HZAF4BNlpxTS1Se5rBNHwodsVIp3cNpJcSzi0sGs';
}
