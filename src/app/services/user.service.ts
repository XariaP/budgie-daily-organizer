import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public alertController: AlertController) {
    // this.avatarPic = "../../assets/icon.png";
  }

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
}
