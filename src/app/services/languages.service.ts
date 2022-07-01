import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguagesService {

  constructor() {
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
      tab2: "Monthly Budget",
      tab3: "Calculator",
      profile: "Profile",
    },
    {
      i: 1,
      tab1: "쇼핑리스트",
      tab2: "월간 예산",
      tab3: "계산기",
      profile: "내 프로필",
    },
    {
      i: 2,
      tab1: "Einkaufsliste",
      tab2: "Monatliches Budget",
      tab3: "Taschenrechner",
      profile: "Profil",
    }
  ]
  
  changeLanguage(langIndex){
    var langList = this.languageList;
    var index = langIndex;

    if (langIndex == -1){
      index = this.myLanguage.index;
      if (index == langList.length - 1)
        index = 0;
      else
        index++;
    }

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
      case "profile":
        return lang.profile;     
    }
  }
}
