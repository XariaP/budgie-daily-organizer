import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { async } from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  constructor(public toastController: ToastController) {
    this.date = new Date();
    this.date.setDate(1);
    this.exactdate = new Date();
  }

  date: any;
  exactdate: any;

  languages = {current: 'en', index: 0,
                list: ['en', 'ko', 'ja', 'de', 'fr' ]};
  
  getMonth(){
    // var options = {month: 'long', day: 'numeric', year: 'numeric', weekday: 'long'};
    var options = {month: 'long', year: 'numeric'};
    var lang = this.languages.current;
    return this.date.toLocaleString(lang, options);
  }

  getDate(){
    var options = {month: 'short', day: 'numeric', weekday: 'short'};
    var lang = this.languages.current;
    return this.exactdate.toLocaleString(lang, options);
  }

  changeDate(){
    this.exactdate.setMonth(this.exactdate.getMonth() + 1);
    this.exactdate.setDate(this.exactdate.getDate() + 10);
    }


  changeLanguage(){ //lang
    var langList = this.languages.list;
    var index = this.languages.index;

    if (index == langList.length - 1)
      index = 0;
    else
      index++;
    
    this.languages.current = langList[index];
    this.languages.index = index;
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
}