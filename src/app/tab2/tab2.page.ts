import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { LanguagesService } from '../services/languages.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  constructor(public toastController: ToastController, public language: LanguagesService, public user: UserService) {
    this.date = new Date();
    this.date.setDate(1);
    this.exactdate = new Date();
  }

  date: any;
  exactdate: any;

  getMonth(){
    var options = {month: 'long', year: 'numeric'};
    return this.getDateString(this.date, options);
  }

  getDate(opt){
    // var options = {month: 'short', day: 'numeric', weekday: 'short'};
    var options;
    switch(opt){
      case 'weekday':
        options = {weekday: 'long'};
        break;
      case 'date':
        options = {month: 'long', day: 'numeric'};
        break;
      default:
        options = {month: 'short', day: 'numeric', weekday: 'short'};
    }
    return this.getDateString(this.exactdate, options);
  }

  getDateString(date, options){
    var lang = this.language.myLanguage.code;
    return date.toLocaleString(lang, options);
  }

  changeDate(){
    this.exactdate.setMonth(this.exactdate.getMonth() + 1);
    this.exactdate.setDate(this.exactdate.getDate() + 10);
  }

  changeMonth(direction: string){
    switch(direction){
      case 'prev':
        this.date.setMonth(this.date.getMonth() - 1);
        console.log(this.date);
        break;

      case 'next':
        this.date.setMonth(this.date.getMonth() + 1);
        console.log(this.date);
        break;
      
      case 'today':
        var today = new Date;
        this.date.setMonth(today.getMonth())
        this.exactdate = new Date();
        break;

      default:
        console.log(this.date);
    }
  }
  
  mailStatus: string = "mail";

  updateMailStatus(status){
    if (status == 'toogle'){
      if (this.mailStatus == "mail-open")
        this.updateMailStatus('close');
      else
        this.updateMailStatus('open');
    }
    else if (status == 'close')
      this.mailStatus = "mail";
    else
      this.mailStatus = "mail-" + status;
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your settings have been saved.',
      duration: 2000,
      icon: "cash-outline",
      position: 'middle'
    });
    toast.present();
  }

  getAvatar(){
    return this.user.getAvatar();
  }
}