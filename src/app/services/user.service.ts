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

  // Initialize with saved user information
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

  // Displays menu when active
  showMenu: boolean = false;

  // Profile photo paths
  path: string = "../../assets/";

  photos = [
    "pet-1.jpg",
    "room-1.jpg", "room-2.jpg", "room-3.jpg",
    "winter-1.jpg",
    "flower-1.jpg", "flower-2.jpg",
    "food-1.jpg",
    "dessert-7.jpg",
  ]
  
  // Stores index of current profile photo
  currentAvatarIndex: number = -1;

  // Image path to user's profile photo
  avatarPic: string = "";

  // General user information
  userName: string = "User";
  userBDay: any =  "";
  userJobID: number = 0;

  // Stores relevant data for the shopping list tab
  tab1shopping = {
    myItems: [],
    categories: [
      {name: "All", quantity: 0},
    ],
  };
  
  // Stores relevant data for the budget tab
  tab2budget = {
    transactions: [],
    limits: [],
    mySpending: 0.00,
    mySavings: 0.00,
    totalSpent: 0.00,
  };
  
  // Stores relevant data for the event calendar tab
  tab3events = {
    events: [],
    dates: [],
    dateMap: new Map(),
    emptyEventSlots: []
  };

  // Stores relevant data for the routine schedule tab
  tab4routines = [];
  
  // Clear all user information
  resetUser(){
    this.currentAvatarIndex = -1;
    this.avatarPic = "";
    this.userName = "User";
    this.userBDay =  "";
    this.userJobID = 0;

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

  // Update user information
  changeAvatar(){
    this.currentAvatarIndex++;
    if (this.currentAvatarIndex == this.photos.length){
      this.currentAvatarIndex = -1;
      this.avatarPic = "";
    }
    else
      this.avatarPic = this.path + this.photos[this.currentAvatarIndex];
  }

  setName(name: string){
    this.userName = name;
  }

  setBDay(date: Date | string){
    this.userBDay = date;
  }

  setJobID(ID: number){
    this.userJobID = ID;
  }

  setTab1Info(info: { myItems: any[]; categories: { name: string; quantity: number; }[] | { name: string; quantity: number; }[]; }){
    this.tab1shopping = info;
  }

  setTab2Info(info: any){
    this.tab2budget = info;
  }

  setTab3Info(info: { events: any[] | { what: string; who: string[]; where: string; time: string; date: Date; active: boolean; }[]; dates: any[] | { date: Date; eventIDs: any[]; active: boolean; }[]; dateMap: Map<any, any>; emptyEventSlots: any[] | number[]; }){
    this.tab3events = info;
  }

  setTab4Info(info: any[]){
    this.tab4routines = info;
  }

  async presentAlert(alertInfo: { header: any; subHeader: any; buttons: any; inputs: any; }){
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
  getDateString(date: Date, options: any){
    var lang = this.language.myLanguage.code;
    return date.toLocaleString(lang, options);
  }

  getDate(opt: string){
    var options: { weekday?: string; month?: string; day?: string; year?: string; };
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
      this.userName = data.name;
      this.userBDay = data.bday;
      this.currentAvatarIndex = data.avatar;
      if (data.jobID == undefined)
        this.userJobID = 0;
      else
        this.userJobID = data.jobID;
    }
    if (this.currentAvatarIndex == -1)
      this.avatarPic = "";
    else
      this.avatarPic = this.path + this.photos[this.currentAvatarIndex];
  }

  // Save information
  saveUser(){
    this.set('userInfo', {
      avatar: this.currentAvatarIndex,
      name: this.userName,
      bday: this.userBDay,
      jobID: this.userJobID,
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
  
  // Get user information
  getAvatar(){
    return this.avatarPic;
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

  removeFading(){
    setTimeout(() => {
      let fades = document.getElementsByClassName("fadeIn");
      let length = fades.length;
      while(length != 0){
        fades[0].setAttribute("class", "noFade");
        length--;
      }
    }, 1500);
  }
}
