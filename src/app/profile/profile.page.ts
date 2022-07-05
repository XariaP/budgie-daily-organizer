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

  constructor(public language: LanguagesService, public location: LocationStrategy, public user: UserService) { }

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
    var avatarPic = this.user.getAvatar();
    if (avatarPic == "")
      avatarPic = "../../assets/" + this.user.photos[0];
    return avatarPic;
  }

  changeAvatar(){
    this.user.changeAvatar();
  }
}