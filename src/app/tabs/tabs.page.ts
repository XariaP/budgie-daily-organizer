import { Component } from '@angular/core';
import { LanguagesService } from '../services/languages.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(public language: LanguagesService) {

  }

  getLabel(name){
    return this.language.getLabel(name);
  }
}
