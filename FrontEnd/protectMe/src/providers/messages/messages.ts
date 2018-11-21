import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the MessagesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MessagesProvider {

  constructor(public http: HttpClient) {
    console.log('Hello MessagesProvider Provider');
  }

  sendMessageToBackend(message){
    console.log(message);
    return new Promise((resolve, reject) => {
      this.http.post('http://172.20.10.3:8080/api/message', message)
        .subscribe(res => {
          //resolve(res);
        }, (err) => {
          //reject(err);
        });
    });
  }

}
