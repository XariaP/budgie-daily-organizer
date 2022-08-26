import { Component, OnInit } from '@angular/core';
import { LanguagesService } from '../services/languages.service';
import { LocationStrategy } from '@angular/common';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(public language: LanguagesService, public location: LocationStrategy, public user: UserService) {
    setTimeout(() => {
      this.retrieveData();
    }, 500);
  }

  ngOnInit() {
    // const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // // Add or remove the "dark" class based on if the media query matches
    // function toggleDarkTheme(shouldAdd) {
    //   document.body.classList.toggle('dark', shouldAdd);
    // }
    
    // toggleDarkTheme(prefersDark.matches);

    // // Listen for changes to the prefers-color-scheme media query
    // prefersDark.addListener((mediaQuery) => toggleDarkTheme(mediaQuery.matches));
  }

  // dark(){
  //   AppCompatDelegate.setDefaultNightMode().
  // }

  changeLanguage(){
    this.language.presentLanguageOptionsAlert();
    // this.language.changeLanguage(choiceIndex);
  }

  getLabel(name){
    return this.language.getLabel(name);
  }

  exit(){
    this.location.historyGo(-1);
  }

  getAvatar(){
    return this.user.getAvatar();
  }

  changeAvatar(){
    this.user.changeAvatar();
  }

  saveUser(){
    this.user.setName(this.userName);
    this.user.setBDay(this.userBDay);
    // this.user.userName = this.userName;
    // this.user.userBDay = this.userBDay;

    this.setOpen(false);
    this.user.saveUser();
    this.language.displayProfileToast('save');
  }

  deleteUser(){
    var header = 'Are you sure you want to delete your profile?';
    var subHeader = "Start fresh";
    var buttons = [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'alert-button-cancel'
      },
      {
        text:'OK',
        handler: () => {
          this.deleteUserHelper();
        },
        cssClass: 'alert-button-confirm'
      }
    ]
    var inputs = [];
    this.language.presentAlert({header, subHeader, buttons, inputs});
  }

  deleteUserHelper(){
    this.user.resetUser();
    this.language.displayProfileToast('delete');
  }


  mailStatus: string = "mail";

  updateMailStatus(status){
    this.modalData = "mail";
    if (status == 'toogle'){
      if (this.mailStatus == "mail-open"){
        this.updateMailStatus('close');
        this.setOpen(false);
      }
      else{
        this.updateMailStatus('open');
        this.setOpen(true);
      }
    }
    else if (status == 'close'){
      this.mailStatus = "mail";
      // this.setOpen(true);
    }
    else
      this.mailStatus = "mail-" + status;
  }

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  modalData = "";

  updateInfo(){
    this.setOpen(true);    
    this.modalData = "profileEdit";
  }

  userName: string = "Xaria Adjoa Kianna Prempeh";
  userBDay =  "2001-07-02T00:00:00";

  getDateString(date: Date){
    var lang = this.language.myLanguage.code;
    return date.toLocaleString(lang, {month: 'long', day: 'numeric', year: 'numeric'});
  }

  getBDay(){
    let bday = this.userBDay;
    if (bday == "")
      return "";
    else
      return this.getDateString(new Date(bday));
  }

  showDatePicker = false;

  enterBDay(){
    this.showDatePicker = false;
  }

  getUserName(){
    console.log("ji", this.user.userName);
    return this.userName;
  }

  retrieveData(){
    this.userName = this.user.userName;
    this.userBDay = this.user.userBDay;
  }
}