import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LanguagesService } from './languages.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public alertController: AlertController, public language: LanguagesService) {
    // this.avatarPic = "../../assets/icon.png";
  }

  showMenu: boolean = false;

  avatarPic: string = "";

  currentAvatarIndex = -1;
  photos = [
    // "mafumafu-1.png",
    // "dessert-7.jpg",
    "pet-1.jpg",
    "room-1.jpg",
    "room-2.jpg",
    "room-3.jpg",
    "winter-1.jpg",
    "flower-1.jpg",
    "food-1.jpg",
  ]

  getAvatar(){
    return this.avatarPic;
  }

  changeAvatar(){
    var path = "../../assets/";
    this.currentAvatarIndex++;
    if (this.currentAvatarIndex == this.photos.length)
      this.currentAvatarIndex = 0;
    this.avatarPic = path + this.photos[this.currentAvatarIndex];
  }

  async presentAlert(alertInfo){
    const alert = await this.alertController.create({
      header: alertInfo.header,
      subHeader: alertInfo.subHeader,
      buttons: alertInfo.buttons,
      inputs: alertInfo.inputs,
      cssClass: 'custom-alert',
    });

    await alert.present();
  }


  date: Date = new Date();

  // Convert date to string given format
  getDateString(date, options){
    var lang = this.language.myLanguage.code;
    return date.toLocaleString(lang, options);
  }

  getDate(opt){
    var options;
    switch(opt){
      case 'weekday':
        options = {weekday: 'long'};
        break;
      case 'date':
        options = {month: 'long', day: 'numeric'};
        break;
      case 'dayyear':
        options = {month: 'long', year: 'numeric'};
        break;
      case 'daydate':
        options = {weekday: 'long', month: 'long', day: '2-digit', year: 'numeric'};
        break;
      default:
        options = {month: 'short', day: 'numeric', weekday: 'short'};
    }
    return this.getDateString(this.date, options);
  }
}
