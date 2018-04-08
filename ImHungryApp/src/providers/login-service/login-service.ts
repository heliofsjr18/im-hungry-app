import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestClientProvider } from '../rest-client/rest-client';
import { FCM } from '@ionic-native/fcm';

@Injectable()
export class LoginServiceProvider {

  constructor(public http: HttpClient, private rest: RestClientProvider, private fcm: FCM) {
  }


  public prepareDeviceToken(){
    return this.fcm.getToken().then(token => {
      if(token){
        return Promise.resolve(token);
      }else{
        this.fcm.onTokenRefresh().subscribe(token => {
          return Promise.resolve(token);
        });
      }
    });
  }

  //HFSJ - Tirando as chamadas de serviço externo das telas
  public getLoginRest(url: string, bodyJson) {
    return this.rest.getLoginJson(url, bodyJson);
  }
}
