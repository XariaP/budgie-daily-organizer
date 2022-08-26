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
      // this.showInfo = true;
    }, 500);
  }

  showInfo = true;
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
    if (this.userName == "Lazy"){
      this.userName = "Xaria Adjoa Kianna Prempeh";
      this.userBDay =  "2001-07-02T00:00:00";
    }
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
    var subHeader = "Be careful, you'll be deleting your lists, budget, events, and routines!";
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
    this.retrieveData();
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
    this.setOpen(!this.isModalOpen);
    this.modalData = "profileEdit";
  }

  userName: string = "";
  userBDay =  "";

  getDateString(date: Date){
    var lang = this.language.myLanguage.code;
    return date.toLocaleString(lang, {month: 'long', day: 'numeric', year: 'numeric'});
  }

  getBDay(){
    let bday = this.userBDay;
    if (bday == "" || bday == undefined)
      return "Unknown";
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

  calculateAge(){
    if (this.userBDay == "" || this.userBDay == undefined)
      return "Unknown";
    let today = new Date();
    let thisyear = today.getFullYear();

    let bday = new Date(this.userBDay);
    let birthyear = bday.getFullYear();
    bday.setFullYear(thisyear);
    bday.setHours(0);
    bday.setMinutes(0);
    bday.setMilliseconds(0);
    
    if (today < bday)
      return (thisyear - birthyear) - 1;
    else
      return (thisyear - birthyear);
  }

  getGreeting(){
    let today = new Date();
    let bday = new Date(this.userBDay);
    let greeting = "Hello";
    if (today.getMonth() == bday.getMonth() && today.getDate() == bday.getDate())
      greeting = "Happy Birthday";
    return greeting;
  }

  getIcon(){
    let today = new Date();
    let bday = new Date(this.userBDay);
    let greeting = "sparkles";
    if (today.getMonth() == bday.getMonth() && today.getDate() == bday.getDate())
      greeting = "gift";
    return greeting;
  }

  colorID = 0;
  colours = [
    "light",
    "primary", "secondary", "tertiary",
    "danger","warning","success",
    "pink","lilac","teal",
    "neon", "violet"];

  getGreetingColor(){
    return this.colours[this.colorID];
  }
  changeColor(){
    this.colorID++;
    if (this.colorID == this.colours.length)
      this.colorID = 0;
  }

  jobID = 1;
  jobs = [
    "Unknown",
    "University Student",
    "Highschool Student",
    "Primary school student",
    "Teacher",
    "Software Engineer",
  ]

  changeJob(){
    this.jobID++;
    if (this.jobID == this.jobs.length){
      this.jobID = 0;
    }
  }
  getJob(){
    return this.jobs[this.jobID];
  }
}