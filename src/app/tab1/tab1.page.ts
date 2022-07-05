import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LanguagesService } from '../services/languages.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(public language: LanguagesService, public user: UserService, public alertController: AlertController) {}

  getLabel(name){
    return this.language.getLabel(name);
  }

  list1 = [
    {itemName: "Milk", icon: "cafe", color: "danger", category: "Breakfast", selected: false},
    {itemName: "Yoghurt", icon: "cafe", color: "warning", category: "Breakfast", selected: false},
    {itemName: "Eggs", icon: "egg", color: "success", category: "Breakfast", selected: false},
    {itemName: "Bagels", icon: "egg", color: "warning", category: "Breakfast", selected: false},
  ]
  
  edit: boolean = false;
  currentItem = null;

  setEdit(){
    this.edit = !this.edit;
    if (!this.edit){
      this.currentItem = null;
    }
  }

  selectItem(item, edit){
    if (edit){ //mark for edit;
      this.currentItem = item;
    }
    else{ //mark as obtained
      item.selected = !item.selected;
    }
  }

  checkSelected(item){
    if (item.selected)
      return item.color;
    else
      return "medium";
  }

  checkEditItem(item){
    return (this.currentItem == item);
  }

  getAvatar(){
    return this.user.getAvatar();
  }

  addItem(){
    // this.presentAddAlert();

    var newItem = {
      itemName: "New Item",
      icon: "receipt",
      color: "secondary",
      category: "Miscellaneous",
      selected: false
    };
    this.list1.splice(0, 0, newItem);

    this.edit = true; //
    this.selectItem(newItem, this.edit);
  }

  removeItem(item){
    this.presentRemoveAlert(item);
  }

  async presentRemoveAlert(item) {
    const alert = await this.alertController.create({
      header: 'Are you sure you want to delete ' + item.itemName + '?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text:'OK',
          handler: () => {
            var tempList = this.list1;
            for (var i = 0; i < tempList.length; i++){
                if (tempList[i] == item){
                  this.list1.splice(i, 1);
                  break;
                }
            }
          }
        }
      ]
    });

    await alert.present();
  }

  checkOut(){
    var updatedList = [];
    for (var i = 0; i < this.list1.length; i++){
      if (!this.list1[i].selected){
        updatedList.push(this.list1[i]);
      }
    }
    this.list1 = updatedList;
  }


  async presentAddAlert() {
    const alert = await this.alertController.create({
      header: 'Please enter your info',
      buttons: [
        {
          text:'OK',
          handler: item => {
            var newItem = {
              itemName: item.name,
              icon: item.icon,
              color: item.color,
              category: item.category,
              selected: false
            };
            this.list1.push(newItem);

            this.setEdit();
            this.selectItem(newItem, this.edit);
          }
        }
      ],
      inputs: [
        {
          // type: 'text',
          name: 'name',
          placeholder: 'Name',
        },
        {
          name: 'icon',
          placeholder: 'Icon',
        },
        {
          name: 'color',
          placeholder: 'Colour',
        },
        {
          name: 'category',
          placeholder: 'Category'
        }
      ]
    });

    await alert.present();
  }
}