import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LanguagesService } from './languages.service';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _storage: Storage | null = null;

  constructor(private storage: Storage, public alertController: AlertController, public language: LanguagesService) {
    this.init();
  }

  async init() {
   const storage = await this.storage.create();
    this._storage = storage;
    this.retrieveUser(); //needs to be here otherwise might try to retrieve before storage is set up.
    this.getTab4Info();
    this.getTab3Info();
    this.getTab2Info();
    this.getTab1Info();
  }

  // Create and expose methods that users of this service can call
  public set(key: string, value: any) {
    this._storage?.set(key, value);
  }

  public get(key: string){
    return this._storage?.get(key);
  }

  showMenu: boolean = false;

  path: string = "../../assets/";

  photos = [
    "pet-1.jpg",
    "room-1.jpg", "room-2.jpg", "room-3.jpg",
    "winter-1.jpg",
    "flower-1.jpg", "flower-2.jpg",
    "food-1.jpg",

    "mafumafu-1.png", "mafumafu-2.png", "mafumafu-3.png",
    "dessert-7.jpg",
  ]
  
  currentAvatarIndex = -1;

  avatarPic: string = "";

  userName: string = "Xaria Adjoa Kianna Prempeh";
  userBDay =  "2001-07-02T00:00:00";

  tab1shopping = {
    myItems: [],
    categories: [
      {name: "All", quantity: 0},
    ],
  };
  
  tab2budget = {
    transactions: [],
    limits: [],
    mySpending: 0.00,
    mySavings: 0.00,
    totalSpent: 0.00,
  };
  
  tab3events = {
    events: [],
    dates: [],
    dateMap: new Map(),
    emptyEventSlots: []
  };

  tab4routines = [];
  
  resetUser(){
    this.currentAvatarIndex = -1;
    
    this.avatarPic = "";

    this.userName = "";

    this.userBDay =  "2000-01-01T00:00:00";

    this.tab1shopping = {
      myItems: [],
      categories: [
        {name: "All", quantity: 0},
      ],
    };
    
    this.tab2budget = {
      transactions: [],
      limits: [],
      mySpending: 0.00,
      mySavings: 0.00,
      totalSpent: 0.00,
    };
    
    this.tab3events = {
      events: [],
      dates: [],
      dateMap: new Map(),
      emptyEventSlots: []
    };
  
    this.tab4routines = [];

    this.saveUser();
    this.saveTab1Info();
    this.saveTab2Info();
    this.saveTab3Info();
    this.saveTab4Info();
  }


  getAvatar(){
    return this.avatarPic;
  }

  changeAvatar(){
    this.currentAvatarIndex++;
    if (this.currentAvatarIndex == this.photos.length)
      this.currentAvatarIndex = 0;
    this.avatarPic = this.path + this.photos[this.currentAvatarIndex];
  }

  setName(name){
    this.userName = name;
  }

  setBDay(date){
    this.userBDay = date;
  }

  setTab1Info(info){
    this.tab1shopping = info;
  }

  setTab2Info(info){
    this.tab2budget = info;
  }

  setTab3Info(info){
    this.tab3events = info;
  }

  setTab4Info(info){
    this.tab4routines = info;
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

  async retrieveUser(){
    let data = await this.get('userInfo');
    if (data != undefined){
      console.log(data);
      this.userName = data.name;
      this.userBDay = data.bday;
      this.currentAvatarIndex = data.avatar;
    }
    if (this.currentAvatarIndex == -1)
      this.avatarPic = "";
    else
      this.avatarPic = this.path + this.photos[this.currentAvatarIndex];
  }

  saveUser(){
    this.set('userInfo', {
      avatar: this.currentAvatarIndex,
      name: this.userName,
      bday: this.userBDay
    });
  }

  saveTab1Info(){
    this.set('shopping', this.tab1shopping);
  }

  saveTab2Info(){
    this.set('budget', this.tab2budget);
  }

  saveTab3Info(){
    this.set('events', this.tab3events);
  }

  saveTab4Info(){
    this.set('routines', this.tab4routines);
  }

  async getTab1Info(){
    let data = await this.get('shopping');
    if (data != undefined)
      this.tab1shopping = data;
  }

  async getTab2Info(){
    let data = await this.get('budget');
    if (data != undefined)
      this.tab2budget = data;
  }

  async getTab3Info(){
    let data = await this.get('events');
    if (data != undefined)
      this.tab3events = data;
  }

  async getTab4Info(){
    let data = await this.get('routines');
    if (data != undefined)
      this.tab4routines = data;
  }
}
