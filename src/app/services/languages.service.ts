import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {

  constructor(public alertController: AlertController, public toastCtrl: ToastController) {
  }

  // The current language of the application
  myLanguage = {code: 'en', index: 0};

  // Available languages
  languageList = [
    {i: 0, code: 'en', name: "English"},
    {i: 1, code: 'ko', name: "한국어"},
    {i: 2, code: 'de', name: "Deutsch"},
    // {i: 3, code: 'fr', name: "français"},
    // {i: 4, code: 'ja', name: "日本語"},
  ]

  // Vocabulary lists for each language
  translations = [
    /* English */
    {
      profile: "Profile",
      age: "Age",
      bday: "Birthday",
      hello: "Hello",
      name: "Name",
      today: "Today",
      tab1: "Shopping List",
      // tab1Content: {
      //   all: "All",
      //   newList: "New List",
      //   listInfo: "List Information",
      //   itemName: "Item Name",
      //   newItem: "New Item",
      //   items: "Item(s)",
      //   name: "Name",
      //   delete: "Delete",
      //   save: "Save",
      //   list: "List",
      // },
      tab2: "Monthly Budget",
      tab3: "Calendar",
      tab4: "Timetable",
      tab5: "Calculator",
    },

    /* Korean */
    {
      profile: "프로필",      // "내 프로필"
      age: "나이",
      bday: "생일",
      hello: "안녕하세요",
      name: "이름",
      today: "오늘",
      country: "나라",
      tab1: "쇼핑리스트",
      tab2: "월간 예산",
      tab3: "달력",
      tab4: "시간표",
      tab5: "계산기",
    },

    /* German */
    {
      profile: "Profil",
      age: "Alter",
      bday: "Geburtstag",
      hello: "Hallo",
      name: "Name",
      today: "Heute",
      tab1: "Einkaufsliste",
      tab2: "Monatliches Budget",
      tab3: "Kalendar",
      tab4: "Zeitplan",
      tab5: "Taschenrechner", 
    }
  ]
  
  /* Updates variables which keep track of the application's current language */
  changeLanguage(langIndex: number){
    this.myLanguage.code = this.languageList[langIndex].code;
    this.myLanguage.index = langIndex;
    this.translateDaysOfWeek();
  }

  /* Returns the phrase in the appropriate language */
  getLabel(name: string){
    var lang = this.translations[this.myLanguage.index];
    switch(name){
      case "tab1":
        return lang.tab1;
      case "tab2":
        return lang.tab2;
      case "tab3":
        return lang.tab3;
      case "tab4":
        return lang.tab4;
      case "profile":
        return lang.profile;
      case "age":
        return lang.age;
      case "bday":
        return lang.bday;
      case "hello":
        return lang.hello;
      case "name":
        return lang.name;
      case "today":
        return lang.today;
    }
  }

  // Shows pop up alert for language selection
  async presentLanguageOptionsAlert() {
    const alert = await this.alertController.create({
      header: 'Select a language',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'OK',
          handler: langIndex => {
            this.changeLanguage(langIndex)
          }
        }
      ],
      inputs: this.getLangOptions(),
    });

    await alert.present();
  }

  // Returns language options for the language selection alert
  getLangOptions(){
    var opts = [];
    var langs: { name: any; i: number; code: string; };
    var checked = false;

    for (var i = 0; i < this.languageList.length; i++){
      langs = this.languageList[i];
      checked = (i == this.myLanguage.index);
      opts.push({label: langs.name, type: 'radio', value: i, checked: checked})
    }

    return opts;
  }


  // Displays generic alert
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
  
  // Shows temporary toast notification
  async presentToast(message: string, duration: number, icon: string, position: "top" | "middle" | "bottom", color: any) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: duration,
      icon: icon,
      position: position,
      color: color,
      buttons: [
        {
          side: 'end',
          text: 'dismiss',
          role: 'cancel',
          handler: () => {
            // console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }

  // Shows temporary toast notification for profile
  displayProfileToast(type: string){
    let message: string, icon: string, position: "top" | "middle" | "bottom";
    switch(type){
      case 'delete':
        message = "Profile deleted";
        icon = "close-circle";
        position = "middle";
        break;
      case 'save':
        message = "Profile saved";
        icon = "save";
        position = "middle";
        break;
    }
    this.presentToast(message, 2000, icon, position, "light");
  }

  // Shows toast for shopping list
  displayTab1Toast(type: string){
    let message: string, icon: string, position: "top" | "middle" | "bottom";
    switch(type){
      case 'checkOut':
        message = "All checked items were removed";
        icon = "basket";
        position = "bottom";
        break;
      case 'edit':
        message = "Entering Edit mode";
        icon = "bag-remove";
        position = "top";
        break;
      case 'save':
        message = "Exiting Edit mode";
        icon = "bag-check";
        position = "top";
        break;
    }
    this.presentToast(message, 2000, icon, position, "light");
  }

  displayTab2Toast(type: string){
    let message: string, icon: string;
    switch(type){
      case 'clear':
        message = "All transactions cleared";
        icon = "cash-outline";
        break;
    }
    this.presentToast(message, 2000, icon, "middle", "light");
  }

  displayTab3Toast(type: string, extra = undefined){
    let message: string, icon: string;
    switch(type){
      case 'clear':
        message = "All events cleared";
        icon = "trash-bin";
        break;

      case 'groupBy':
        message = "Grouping by " + extra;
        icon = "today";
        break;
    }
    this.presentToast(message, 2000, icon, "top", "light");
  }

  displayTab4Toast(type: string){
    let message: string, icon: string;
    let position: "top" | "middle" | "bottom" = "middle";
    switch(type){
      case 'edit':
        message = "Entering Edit mode";
        icon = "brush";
        break;
      case 'delete':
        message = "Entering Delete mode";
        icon = "trash";
        break;
      case 'all':
        message = "Showing all routines";
        icon = "today";
        break;
      case 'expand':
        message = "Expanding routine information";
        icon = "expand";
        break;
      case 'mini':
        message = "Minimizing routine information";
        icon = "archive";
        break;
      case 'invalidTime':
        message = "Enter all times before saving";
        icon = "alarm";
        position = "top";
        break;
    }
    this.presentToast(message, 2000, icon, position, "light");
  }

  days = [
    {val: "Sunday", checked: false, short: "SUN"},
    {val: "Monday", checked: false, short: "MON"},
    {val: "Tuesday", checked: false, short: "TUE"},
    {val: "Wednesday", checked: false, short: "WED"},
    {val: "Thursday", checked: false, short: "THU"},
    {val: "Friday", checked: false, short: "FRI"},
    {val: "Saturday", checked: false, short: "SAT"},
  ];

  translateDaysOfWeek(){
    let lang = this.myLanguage.code;
    let date = new Date();
    date.setDate(date.getDate() + 1);
    let count = 0;
    let daynum = 0;
    let daynameFull: string = "";
    let daynameShort: string = "";
    
    while (count < 7){
      daynum = date.getDay();
      daynameFull = date.toLocaleDateString(lang, {weekday: "long"});
      daynameShort = date.toLocaleDateString(lang, {weekday: "short"});
      this.days[daynum].val = daynameFull;
      this.days[daynum].short = daynameShort;
      date.setDate(date.getDate() + 1);
      count++;
    }
  }
}


//https://www.google.com/search?q=german+form+age&tbm=isch&ved=2ahUKEwjmo_LPvNj4AhUCO98KHZX1B3IQ2-cCegQIABAA&oq=german+form+age&gs_lcp=CgNpbWcQAzoECCMQJzoFCAAQgAQ6BAgAEB46BggAEB4QCFDzCFj7FmDKGWgAcAB4AIABigGIAdoEkgEDMC41mAEAoAEBqgELZ3dzLXdpei1pbWfAAQE&sclient=img&ei=ilG_Yua2MoL2_AaV65-QBw#imgrc=vWnJx-Nkzj9Y9M