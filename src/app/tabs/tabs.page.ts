import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LanguagesService } from '../services/languages.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(public language: LanguagesService, public user: UserService, private router: Router) {

  }

  getLabel(name){
    return this.language.getLabel(name);
  }
  
  showMenu(){
    return this.user.showMenu;
    // return true;
  }

  navigate(page){
    this.router.navigate([page]);
  }

  checkPage(page){
    // console.log(page, this.router.url);
    if (page == this.router.url)
      return "clear";
    else
      // return "light";
      return "";
  }

  
}
