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
  public Token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1MjE3NTc0NzEsImp0aSI6Ikp2U1hVMEc0bE9zSUxrenZrNlM1SHNJNjdFaGtnclVGRTVxaDdCaGlGREE9IiwiaXNzIjoiaHR0cDpcL1wvcmFmYWZyZWl0YXMuY29tXC8iLCJuYmYiOjE1MjE3NTc0ODEsImV4cCI6MTUyMTg0Mzg4MSwiZGF0YSI6eyJ1c2VyX2lkIjoiMSIsInVzZXJfbm9tZSI6Ik1hdGhldXMiLCJ1c2VyX2NwZiI6IjEwMTI0OTQ0NDY5IiwidXNlcl9lbWFpbCI6InRlc3RlQHRlc3RlLmNvbSIsInVzZXJfdGVsZWZvbmUiOiI4MTMzNzI2MjQ5IiwidXNlcl9kYXRhIjoiMjAxOC0wMy0wNSIsInVzZXJfY2FkYXN0cm8iOiIyMDE4LTAzLTA1IDAwOjAwOjAwIiwidXNlcl9mb3RvX3BlcmZpbCI6bnVsbCwidXNlcl9zdGF0dXMiOiIxIiwidGlwb19pZCI6IjEiLCJkYXRlQW5pdmVyc2FyaW8iOiIwNVwvMDNcLzIwMTgiLCJkYXRlQ2FkYXRybyI6IjA1XC8wM1wvMjAxOCJ9fQ.q9wsku_F20d6is3AD06zBGfqZB7V-X4RMDOqTjkQX1U';
}
