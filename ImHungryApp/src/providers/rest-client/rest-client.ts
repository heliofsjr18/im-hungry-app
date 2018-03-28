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
  public Token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1MjIyNTgxODEsImp0aSI6IlwvTjM5TVpkS1FEck02bHFsRmRIb2lzOE5JR1FiUEt1c09ITU1jREdyMGIwPSIsImlzcyI6Imh0dHA6XC9cL3JhZmFmcmVpdGFzLmNvbVwvIiwibmJmIjoxNTIyMjU4MTkxLCJleHAiOjE1MzA4OTgxOTEsImRhdGEiOnsidXNlcl9pZCI6IjEiLCJ1c2VyX25vbWUiOiJNYXRoZXVzIEd1aWxoZXJtZSIsInVzZXJfY3BmIjoiMTAxMjQ5NDQ0NjkiLCJ1c2VyX2VtYWlsIjoidGVzdGVAdGVzdGUuY29tIiwidXNlcl90ZWxlZm9uZSI6IjgxMzM3MjYyNDkiLCJ1c2VyX2RhdGEiOiIyMDE4LTAzLTA1IiwidXNlcl9jYWRhc3RybyI6IjIwMTgtMDMtMDUgMDA6MDA6MDAiLCJ1c2VyX2ZvdG9fcGVyZmlsIjpudWxsLCJ1c2VyX3N0YXR1cyI6IjEiLCJ0aXBvX2lkIjoiMSIsImRhdGVBbml2ZXJzYXJpbyI6IjA1XC8wM1wvMjAxOCIsImRhdGVDYWRhc3RybyI6IjA1XC8wM1wvMjAxOCJ9fQ.LYHLz7DzObmYA_Ur-XERoqLCsOmr_EVvgEwdMg1derA';
}
