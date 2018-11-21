import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IonicPage, NavParams, ToastController } from 'ionic-angular';
import { MessagesProvider } from '../../providers/messages/messages';
import { NetworkInterface } from '@ionic-native/network-interface';
import { Geolocation } from '@ionic-native/geolocation';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  messages = [];
  nickname = '';
  message = '';




  constructor(private navCtrl: NavController, private navParams: NavParams,  private toastCtrl: ToastController,
              public messagesProvider:MessagesProvider,public networkInterface:NetworkInterface,
    public geolocation:Geolocation) {
    this.nickname = 'Robert';


    const message1={
      "from":'Voluntari',
      "text":"Hola Robert! que tal va aquesta setmana?",
      "created":new Date(2018, 1, 25, 0, 0, 0, 0)
    };
    //"-Robert. La veritat es que mai es porten be amb mi, el Joan desdeque va començar aquest curs que ja no vol jugar amb mi i va amb el Sergio.. El Joan era el meu millor amic, pero nose que pasa ... diuen que tot ho faig malament i que soc un pesat.."

    this.messages.push(message1);
    const message11={
      "from":this.nickname,
      "text":"Bueno....aquesta setmana el Sergio i en Joan no s'han portat gare be amb mi, son dos companys de clase...",
      "created":new Date(2018, 1, 25, 0, 0, 0, 0)
    };
    this.messages.push(message11);
    const message12={
      "from":"Voluntari",
      "text":"Vaja... vols explicar-mo ?",//"Bueno....aquesta setmana el Sergio i en Joan no s'han portat gare be amb mi, son dos companys de clase...",
      "created":new Date(2018, 1, 25, 0, 0, 0, 0)
    };
    this.messages.push(message12);
    //"-Robert. La veritat es que mai es porten be amb mi, el Joan desdeque va començar aquest curs que ja no vol jugar amb mi i va amb el Sergio.. El Joan era el meu millor amic, pero nose que pasa ... diuen que tot ho faig malament i que soc un pesat.."
    const message13={
      "from":this.nickname,
      "text":"La veritat es que mai es porten be amb mi, el Joan desdeque va començar aquest curs que ja no vol jugar amb mi i va amb el Sergio.. El Joan era el meu millor amic, pero nose que pasa ... diuen que tot ho faig malament i que soc un pesat..",//"Bueno....aquesta setmana el Sergio i en Joan no s'han portat gare be amb mi, son dos companys de clase...",
      "created":new Date(2018, 1, 25, 0, 0, 0, 0)
    };
    this.messages.push(message13);
//25/01/2018
    const message2={
      "from":this.nickname,
      "text":"No vull anar al pati no magraden els jocs dels companys",// 17/02/2018-Avui s'han disculpat els companys que l'altre dia es van riure de mi i hem van tirar el entrepa 28/02/2018-El Sergio diu que hem pegara i mignoren els altres companys",
      "created":new Date(2018, 1, 25, 0, 0, 0, 0)
    };
    this.messages.push(message2);
    const message21={
      "from":this.nickname,
      "text":"Avui s'han disculpat els companys que l'altre dia es van riure de mi i hem van tirar el entrepa",// 28/02/2018-El Sergio diu que hem pegara i mignoren els altres companys",
      "created":new Date(2018, 2, 17, 0, 0, 0, 0)
    };
    this.messages.push(message21);
    const message22={
      "from":this.nickname,
      "text":"El Sergio diu que hem pegara i mignoren els altres companys",
      "created":new Date(2018, 2, 28, 0, 0, 0, 0)
    };
    this.messages.push(message22);

/*
    this.getMessages().subscribe(message => {
      this.messages.push(message);
    });

    this.getUsers().subscribe(data => {
      let user = data['user'];
      if (data['event'] === 'left') {
        this.showToast('User left: ' + user);
      } else {
        this.showToast('User joined: ' + user);
      }
    });*/
  }

  sendHelpMe(){
    this.networkInterface.getWiFiIPAddress()
      .then(address => console.info(`own IP: ${address.ip}, Subnet: ${address.subnet}, object: ${address}`))
      .catch(error => console.error(`Unable to get IP: ${error}`));

    this.networkInterface.getCarrierIPAddress()
      .then(address => console.info(`carrier IP: ${address.ip}, Subnet: ${address.subnet}`))
      .catch(error => console.error(`Unable to get IP: ${error}`));

    this.geolocation.getCurrentPosition({ maximumAge: 3000, timeout: 5000, enableHighAccuracy: true }).then((resp) => {
      //let mylocation = new google.maps.LatLng(resp.coords.latitude,resp.coords.longitude);
      console.log(resp.coords);


    });
  }

  sendMessage() {
    const message={
      "from":this.nickname,
      "text":this.message,
      "created":new Date()
    };
    this.messagesProvider.sendMessageToBackend(message);
    this.messages.push(message);
    //this.socket.emit('add-message', { text: this.message });
    this.message = '';
  }


/*
  getMessages() {
    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
    })
    return observable;
  }


  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }*/

}
