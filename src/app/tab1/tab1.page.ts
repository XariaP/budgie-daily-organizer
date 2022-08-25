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
  constructor(public language: LanguagesService, public user: UserService, public alertController: AlertController, public pickerCtrl: PickerController) {
    setTimeout(() => {
      this.retrieveData();
    }, 500);
  }

  getLabel(name){
    return this.language.getLabel(name);
  }

  myItems = [
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
    var categoryID = this.categories.length;
    // this.categories.push({name: "", quantity: 0});
    this.categories.push({name: "List " + categoryID, quantity: 0});
    this.editList(this.show, 'new');
  }

  editList(categoryID, state){
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
            this.saveData();
          }
        },
        {
          text: 'Save',
          handler: item => {
            if (item.categoryName == "")
              category.name = "List " + categoryID;
            else
              category.name = item.categoryName;
            this.saveData();
          }
        }
      ];

      let nameValue = this.categories[categoryID].name;
      if (state == 'new') nameValue = "";
      
      var inputs = [
        {
          type: 'text',
          placeholder: 'Name of List',
          name: 'categoryName',
          value: nameValue,
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
      this.editList(index, 'old');
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
      this.language.displayTab1Toast('save');
    }
    else{
      this.language.displayTab1Toast('edit');
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
      
      if (item.selected){
        this.myItems.push(item);
        this.myItems.splice(this.myItems.indexOf(item), 1);
      }
      else{
        this.myItems.splice(this.myItems.indexOf(item), 1);
        this.myItems.splice(0, 0, item);
      }
    }
  }

  checkSelected(item){
    if (item.selected)
      return item.color;
    else
      return "medium";
  }

  checkEditItem(item){
    // console.log(this.currentItem, item);
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
    this.myItems.splice(0, 0, newItem);
    this.categories[this.myItems[0].categoryID].quantity++;

    this.edit = true; //
    this.selectItem(newItem, this.edit);
    this.saveData();
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
          var tempList = this.myItems;
          for (var i = 0; i < tempList.length; i++){
              if (tempList[i] == item){
                this.categories[this.myItems[i].categoryID].quantity--;
                this.myItems.splice(i, 1);
                break;
              }
          }
          this.saveData();
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

    for (var i = 0; i < this.myItems.length; i++){
      if (!this.myItems[i].selected){
        updatedList.push(this.myItems[i]);
        this.categories[this.myItems[i].categoryID].quantity++;
      }
    }
    this.myItems = updatedList;

    this.language.displayTab1Toast('checkOut');

    this.saveData();
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

  retrieveData(){
    console.log(this.user.tab1shopping);
    let data = this.user.tab1shopping;
    this.myItems = data.myItems;
    this.categories = data.categories;
  }
  
  saveData(){
    this.user.tab1shopping = {
      myItems: this.myItems,
      categories: this.categories,
    };
    this.user.saveTab1Info();
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
//           this.myItems.push(newItem);

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