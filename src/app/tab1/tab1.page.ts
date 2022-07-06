import { Component } from '@angular/core';
import { AlertController, PickerController } from '@ionic/angular';
import { LanguagesService } from '../services/languages.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  constructor(public language: LanguagesService, public user: UserService, public alertController: AlertController, public pickerCtrl: PickerController) {}

  getLabel(name){
    return this.language.getLabel(name);
  }

  list1 = [
    // {itemName: "Milk", icon: "cafe", color: "danger", categoryID: 1, selected: false, quantity: 1},
    // {itemName: "Yoghurt", icon: "cafe", color: "warning", categoryID: 1, selected: false, quantity: 3},
    // {itemName: "Eggs", icon: "egg", color: "success", categoryID: 1, selected: false, quantity: 0},
    // {itemName: "Bagels", icon: "egg", color: "warning", categoryID: 1, selected: false, quantity: 2},
  ]
  
  categories = [
    {name: "All", quantity: 0},
    // {name: "Breakfast", quantity: 4}
  ]

  all = 0;
  show = this.all;

  showAll(){
    this.show = this.all;
  }

  getItemCategory(item){
    var id = item.categoryID;
    if (id == this.all)
      return "";
    else
      return this.categories[item.categoryID].name;
  }

  addList(){
    this.show = this.categories.length;
    this.categories.push({name: "", quantity: 0});
    this.editList(this.show);
  }

  editList(categoryID){
    if (categoryID != this.all){
      var category = this.categories[categoryID];
      var header = "List Information";
      var subHeader = category.quantity + " Item(s)";
      var buttons = [
        {
          text: 'Delete',
          handler: () => {
            if (category.quantity == 0){
              this.categories.splice(categoryID, 1);
              this.showAll();
            }
          }
        },
        {
          text: 'Save',
          handler: item => {
            if (item.categoryName == "")
              category.name = "List " + categoryID;
            else
              category.name = item.categoryName;
          }
        }
      ];
      var inputs = [
        {
          type: 'text',
          placeholder: 'Name',
          name: 'categoryName',
          value: this.categories[categoryID].name,
        }
      ];
      this.presentAlert({header, subHeader, buttons, inputs});
    }
  }

  colours = [
    {name: "green", value: "primary"},
    {name: "light blue", value: "secondary"},
    {name: "blue", value: "tertiary"},
    {name: "yellow", value: "warning"},
    {name: "red", value: "danger"},
    // "primary", "secondary", "tertiary",
    // "success", "warning", "danger"
  ]

  icons = [
    "pizza",
    "egg",
    "cafe",
    "restaurant",
    "ice-cream",
    "fish",

    "receipt",
    // "person",
    "gift",
    "balloon",
    
    "bandage",
    "medkit",
    "barbell",
    "fitness",
    
    "bed",
    "brush",
    "color-palette",

    "library",
    "school",
    "calculator",

    "home",
    "leaf",
    "rose",
    "paw",
    "construct",
    "bulb",
 
    "camera",
    "desktop",
    "dice",
    "extension-puzzle",
    "game-controller",
    "headset",
    "musical-notes",

    "glasses",
    "shirt",
    "diamond",
    // "cut",
  ]

  chooseIcon1 = false;

  chooseIcon2(){
    this.chooseIcon1 = !this.chooseIcon1;
  }

  setIcon(item, icon){
    item.icon = icon;
  }

  chooseColour = false;

  chooseColor(){
    this.chooseColour = !this.chooseColour;
  }


  selectList(index){
    if (this.show != index)
      this.show = index;
    else 
      this.editList(index);
  }

  determineShow(item){
    if (this.show == this.all || this.show == item.categoryID)
      return true;
    else
      return false;
  }

  determineSelected(category){
    if (category == this.show)
      return "success";
    else
      return "medium";
  }

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
      if (this.currentItem == item)
        this.currentItem = null;
      else
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
    console.log(this.currentItem, item);
    return (this.currentItem == item);
  }

  getAvatar(){
    return this.user.getAvatar();
  }

  addItem(){
    var newItem = {
      itemName: "New Item",
      icon: "receipt",
      color: "secondary",
      categoryID: this.show,
      selected: false,
      quantity: 1,
    };
    this.list1.splice(0, 0, newItem);
    this.categories[this.list1[0].categoryID].quantity++;

    this.edit = true; //
    this.selectItem(newItem, this.edit);
  }

  removeItem(item){
    this.createRemoveAlert(item);
  }

  createRemoveAlert(item) {
    var header = 'Are you sure you want to delete "' + item.itemName + '"?';
    var subHeader = "";
    var buttons = [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'alert-button-cancel'
      },
      {
        text:'OK',
        handler: () => {
          var tempList = this.list1;
          for (var i = 0; i < tempList.length; i++){
              if (tempList[i] == item){
                this.list1.splice(i, 1);
                this.categories[this.list1[i].categoryID].quantity--;
                break;
              }
          }
        },
        cssClass: 'alert-button-confirm'
      }
    ]
    var inputs = [];
    this.presentAlert({header, subHeader, buttons, inputs});
  }

  checkOut(){
    var updatedList = [];

    for (var q = 0; q < this.categories.length; q++){
      this.categories[q].quantity = 0;
    }

    for (var i = 0; i < this.list1.length; i++){
      if (!this.list1[i].selected){
        updatedList.push(this.list1[i]);
        this.categories[this.list1[i].categoryID].quantity++;
      }
    }
    this.list1 = updatedList;
  }

  async presentAlert(alertInfo){
    const alert = await this.alertController.create({
      header: alertInfo.header,
      subHeader: alertInfo.subHeader,
      buttons: alertInfo.buttons,
      inputs: alertInfo.inputs,
      cssClass: 'custom-alert',
    });

    await alert.present();
  }

  async openPicker(item) {
    
    var categoryOptions = [{text: "None", value: this.all,}];
    for (let i = 1; i < this.categories.length; i++){
      categoryOptions.push(
        {
          text: this.categories[i].name,
          value: i,
        }
      )
    }

    const picker = await this.pickerCtrl.create({
      columns: [
        {
          name: 'name',
          options: categoryOptions,
          selectedIndex: item.categoryID,
          // cssClass: 'categoryPicker',
        },
        // {
        //   name: 'icon',
        //   options: [
        //     {
        //       text: 'Red onion',
        //       value: 'red-onion',
        //     },
        //   ],
        // },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          // cssClass: 'categoryPicker',
        },
        {
          text: 'Confirm',
          handler: (value) => {
            var id = value.name.value;
            item.categoryID = id;
            this.show = id;
           },
        },
      ],
      cssClass: 'category-picker',
      showBackdrop: false,
    });

    await picker.present();
  }

  //   async presentAddAlert() {
//     var header = 'Please enter your info';

//     var buttons = [
//       {
//         text:'OK',
//         handler: item => {
//           var newItem = {
//             itemName: item.name,
//             icon: item.icon,
//             color: item.color,
//             categoryID: item.category,
//             selected: false
//           };
//           this.list1.push(newItem);

//           this.setEdit();
//           this.selectItem(newItem, this.edit);
//         }
//       }
//     ];

//     var inputs = [
//       {
//         // type: 'text',
//         name: 'name',
//         placeholder: 'Name',
//       },
//       {
//         name: 'icon',
//         placeholder: 'Icon',
//       },
//       {
//         name: 'color',
//         placeholder: 'Colour',
//       },
//       {
//         name: 'category',
//         placeholder: 'Category'
//       }
//     ];

//     this.presentAlert({header, buttons, inputs});
//   }
}