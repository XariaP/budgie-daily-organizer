import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {

  constructor(public alertController: AlertController, public toastCtrl: ToastController) {

  }

  myLanguage = {code: 'en', index: 0};

  languageList = [
    {i: 0, code: 'en', name: "English"},
    {i: 1, code: 'ko', name: "한국어"},
    {i: 2, code: 'de', name: "Deutsch"},
    // {i: 3, code: 'fr', name: "français"},
    // {i: 4, code: 'ja', name: "日本語"},
  ]

  translations = [
    {
      i: 0,
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
      // tab4: "Calculator",
      profile: "Profile",
      age: "Age",
      bday: "Birthday",
    },
    {
      i: 1,
      tab1: "쇼핑리스트",
      tab2: "월간 예산",
      tab3: "달력",
      // tab4: "계산기",
      profile: "프로필", // "내 프로필"
      age: "나이",
      bday: "생일",
      // addr: "주소" // country: "나라"
    },
    //https://www.google.com/search?q=german+form+age&tbm=isch&ved=2ahUKEwjmo_LPvNj4AhUCO98KHZX1B3IQ2-cCegQIABAA&oq=german+form+age&gs_lcp=CgNpbWcQAzoECCMQJzoFCAAQgAQ6BAgAEB46BggAEB4QCFDzCFj7FmDKGWgAcAB4AIABigGIAdoEkgEDMC41mAEAoAEBqgELZ3dzLXdpei1pbWfAAQE&sclient=img&ei=ilG_Yua2MoL2_AaV65-QBw#imgrc=vWnJx-Nkzj9Y9M
    {
      i: 2,
      tab1: "Einkaufsliste",
      tab2: "Monatliches Budget",
      tab3: "Kalendar",
      // tab4: "Taschenrechner",
      profile: "Profil",
      age: "Alter",
      bday: "Geburtstag",
    }
  ]
  
  changeLanguage(langIndex){
    var langList = this.languageList;
    var index = langIndex;
    // if (langIndex == -1){
    //   index = this.myLanguage.index;
    //   if (index == langList.length - 1)
    //     index = 0;
    //   else
    //     index++;
    // }
    this.myLanguage.code = langList[index].code;
    this.myLanguage.index = index;
  }

  getLabel(name){
    var langIndex = this.myLanguage.index;
    var lang = this.translations[langIndex];
    switch(name){
      case "tab1":
        return lang.tab1;
      case "tab2":
        return lang.tab2;
      case "tab3":
        return lang.tab3;
      
      // case "tab4":
      //   return lang.tab4;
      
        case "profile":
        return lang.profile;
      case "age":
        return lang.age;
      case "bday":
        return lang.bday;
    }
  }

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

  getLangOptions(){
    var opts = [];
    var langs;
    var checked = false;

    for (var i = 0; i < this.languageList.length; i++){
      langs = this.languageList[i];
      checked = (i == this.myLanguage.index);
      opts.push({label: langs.name, type: 'radio', value: langs.i, checked: checked})
    }

    return opts;
  }

  async presentToast(message, duration, icon, position, color) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: duration,
      icon: icon,
      position: position,
      color: color,
      buttons: [
        {
          side: 'end',
          // icon: 'close',
          text: 'dismiss',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }

  displayTab1Toast(type){
    let message, icon, position;
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

  displayTab2Toast(type){
    let message, icon;
    switch(type){
      case 'clear':
        message = "All transactions cleared";
        icon = "cash-outline";
        break;
    }
    this.presentToast(message, 2000, icon, "middle", "light");
  }

  displayTab3Toast(type, extra = undefined){
    let message, icon;
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
    this.presentToast(message, 2000, icon, "middle", "light");
  }
}