import { Component } from '@angular/core';
import { LanguagesService } from '../services/languages.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(public language: LanguagesService) {}

  getLabel(name){
    return this.language.getLabel(name);
  }
}
