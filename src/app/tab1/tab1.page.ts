import { Component } from '@angular/core';
import { LanguagesService } from '../services/languages.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public language: LanguagesService) {}

  getLabel(name){
    return this.language.getLabel(name);
  }

  list1 = [
    {itemName: "Milk", icon: "cafe", color: "danger", category: "Breakfast", selected: false},
    {itemName: "Yoghurt", icon: "cafe", color: "warning", category: "Breakfast", selected: false},
    {itemName: "Eggs", icon: "egg", color: "success", category: "Breakfast", selected: false},
    {itemName: "Bagels", icon: "egg", color: "warning", category: "Breakfast", selected: false},
  ]

  selectItem(item){
    item.selected = !item.selected;
  }

  checkSelected(item){
    if (item.selected)
      return item.color;
    else
      return "medium";
  }
}
