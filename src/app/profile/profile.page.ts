import { Component, OnInit } from '@angular/core';
import { LanguagesService } from '../services/languages.service';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  constructor(public language: LanguagesService, public location: LocationStrategy) { }

  ngOnInit() {
  }

  changeLanguage(){
    this.language.changeLanguage(-1);
  }

  getLabel(name){
    return this.language.getLabel(name);
  }

  exit(){
    this.location.historyGo(-1);
  }
}
