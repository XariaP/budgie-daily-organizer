import { Component, ViewChild } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { LanguagesService } from '../services/languages.service';
import { UserService } from '../services/user.service';

import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  constructor(public toastController: ToastController, public language: LanguagesService, public user: UserService) {
    this.date = new Date();
    this.date.setDate(1);
    this.exactdate = new Date();
  }

  // Convert date to string given format
  getDateString(date, options){
    var lang = this.language.myLanguage.code;
    return date.toLocaleString(lang, options);
  }

  date: any;

  getMonth(){
    var options = {month: 'long', year: 'numeric'};
    return this.getDateString(this.date, options);
  }

  exactdate: any;

  getDate(opt){
    var options;
    switch(opt){
      case 'weekday':
        options = {weekday: 'long'};
        break;
      case 'date':
        options = {month: 'long', day: 'numeric'};
        break;
      case 'dayyear':
        options = {month: 'long', year: 'numeric'};
        break;
      default:
        options = {month: 'short', day: 'numeric', weekday: 'short'};
    }
    return this.getDateString(this.exactdate, options);
  }

  displayDate(date){
    return date.toLocaleDateString();
  }

  // For Testing
  changeDate(){
    this.exactdate.setMonth(this.exactdate.getMonth() + 1);
    this.exactdate.setDate(this.exactdate.getDate() + 10);
  }

  changeMonth(direction: string){
    switch(direction){
      case 'prev':
        this.date.setMonth(this.date.getMonth() - 1);
        // console.log(this.date);
        break;

      case 'next':
        this.date.setMonth(this.date.getMonth() + 1);
        // console.log(this.date);
        break;
      
      case 'today':
        var today = new Date;
        this.date.setMonth(today.getMonth())
        this.exactdate = new Date();
        break;

      default:
        // console.log(this.date);
    }
  }
  
  mailStatus: string = "mail";

  updateMailStatus(status){
    if (status == 'toogle'){
      if (this.mailStatus == "mail-open")
        this.updateMailStatus('close');
      else
        this.updateMailStatus('open');
    }
    else if (status == 'close')
      this.mailStatus = "mail";
    else
      this.mailStatus = "mail-" + status;
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your settings have been saved.',
      duration: 2000,
      icon: "cash-outline",
      position: 'middle'
    });
    toast.present();
  }

  transactions: Array<{
    amount: number,
    note: string,
    date: string,
    type: string,
  }> = [];
  
  limits: Array<{
    purpose: string,
    spent: number,
    limit: number,
    open: boolean,
    transactions: Array<{
      name: string,
      spent: number,
      date: string,
    }>
  }> = [
    // {
    //   purpose: "Groceries",
    //   spent: 20.00,
    //   limit: 100.00,
    //   open: false,
    //   transactions: [
    //     {
    //       name: "Snacks",
    //       spent: 10.00,
    //       date: (new Date()).toLocaleDateString(),
    //     },
    //     {
    //       name: "Snacks",
    //       spent: 10.00,
    //       date: (new Date()).toLocaleDateString(),
    //     }
    //   ]
    // },
    // {
    //   purpose: "Rent",
    //   spent: 0.00,
    //   limit: 1200.00,
    //   // limit: 100000.00,
    //   open: false,
    //   transactions: [
    //     {
    //       name: "Full Rent",
    //       spent: 1000.00,
    //       date: (new Date()).toLocaleDateString(),
    //     },
    //   ]
    // }
  ];

  addLimit(){
    this.limits.push({
      purpose: "Limit " + (this.limits.length + 1),
      spent: 0.00,
      limit: 100.00,
      open: false,
      transactions: [],
      // months
    });
    
    var newLimitID = this.limits.length - 1;
    var newLimit = this.limits[newLimitID];

    this.editLimit(newLimit, newLimitID);
  }

  mySpending: number = 0.00; // 1000.00;
  mySavings: number = 0.00; //5000.00;

  addTransaction(limit){
    var header = "New transaction";
    var subHeader = "For " + limit.purpose;
    var buttons = [
      {
        text: 'Cancel',
      },
      {
        text: 'Save',
        handler: item => {
          var newLimit = {
            name: item.name,
            spent: item.spent,
            date: new Date(this.exactdate),
            //this.displayDate(this.exactdate),
          };
          limit.transactions.splice(0, 0, newLimit);
          // limit.spent += parseInt(item.spent); //increase spent

          this.mySpending -= item.spent;
          this.transactions.splice(0, 0, {
            amount: item.spent,
            note: item.name,
            date: (new Date()).toLocaleDateString(),
            type: "Deduct",
          })
        }
      }
    ];
    var inputs = [
      {
        type: 'text',
        placeholder: "Transaction " + (limit.transactions.length + 1),
        name: 'name',
      },
      {
        type: 'number',
        placeholder: "0.00",
        name: 'spent',
      }
    ];
    this.user.presentAlert({header, subHeader, buttons, inputs});
  }

  editLimit(limit, ID){
    var header = "Set Limit";
    var subHeader = "For " + limit.purpose;
    var buttons = [
      {
        text: 'Delete',
        handler: () => {
          this.limits.splice(ID, 1);
        }
      },
      {
        text: 'Save',
        handler: item => {
          limit.purpose = item.purpose;
          limit.limit = item.limit;
        }
      }
    ];
    var inputs = [
      {
        type: 'text',
        placeholder: limit.purpose,
        name: 'purpose',
        value: limit.purpose,
      },
      {
        type: 'number',
        placeholder: "0.00",
        name: 'limit',
        value: limit.limit,
      }
    ];
    this.user.presentAlert({header, subHeader, buttons, inputs});
  }

  sumSpent(){
    var spent = 0;
    for (let i = 0; i < this.limits.length; i++){
      this.calcLimitSpent(this.limits[i]);
      spent += this.limits[i].spent;
    }
    return this.getAmt(spent);
  }
  
  sumLimit(){
    var spent = 0;
    for (let i = 0; i < this.limits.length; i++){
      spent += this.limits[i].limit;
    }
    return this.getAmt(spent);
  }

  checkLimit(limit){
    this.calcLimitSpent(limit);
    if (limit.spent > limit.limit)
      return "overlimit";
    else
      return "underlimit";    
  }

  getAmt(b){
    return Number(parseFloat(b).toFixed(2)).toLocaleString('en', { minimumFractionDigits: 2 });
  }

  open(b){
    b.open = !b.open;
  }

  getAvatar(){
    return this.user.getAvatar();
  }

  segment: string = "home";

  segmentChanged(ev: any) {
    // console.log('Segment changed', ev);
    // console.log(ev.detail.value);
    this.segment = ev.detail.value;
  }

  thisMonth(transaction){
    // month for transaction
    // var temp = 
    var tDate = this.getTransactionMonth(transaction.date);
    // this month/year
    var month = this.getMonth();

    // console.log(tDate, month);
    // console.log(transaction.date, this.date);
    return tDate == month;
  }

  //fix/merge with other
  getTransactionMonth(date){
    var options = {month: 'long', year: 'numeric'};
    return this.getDateString(date, options);
  }

  calcLimitSpent(limit){
    var spent: number = 0.00;
    for (let i = 0; i < limit.transactions.length; i++){
      if (this.thisMonth(limit.transactions[i]))
        spent += parseFloat(limit.transactions[i].spent);
    }
    limit.spent = spent;
    return this.getAmt(spent);
  }

  transferDirection: string = "SaveSpend";  
  transferIcon: string = "arrow-back";
  transferAmt: number = 0.00;
  canTransfer: boolean = true;
  projectLimits: boolean = false;

  changeTransferDirection(){
    if (this.transferDirection == "SpendSave"){
      this.transferDirection = "SaveSpend";
      this.transferIcon = "arrow-back";
    }
    else{
      this.transferDirection = "SpendSave";
      this.transferIcon = "arrow-forward";
    }
    this.canTransfer = true;
  }

  transferFunds(){
    this.canTransfer = true;

    if (this.transferDirection == "SaveSpend"){
      if (this.mySavings < this.transferAmt){
        this.canTransfer = false;
        return;
      }
      this.mySavings -= this.transferAmt;
      this.mySpending += this.transferAmt;
    }

    if (this.transferDirection == "SpendSave"){
      if (this.mySpending < this.transferAmt){
        this.canTransfer = false;
        return;
      }
      this.mySpending -= this.transferAmt;
      this.mySavings += this.transferAmt;
    }
  }

  setTransferAmt(){
    var from, to;

    switch (this.transferDirection){
      case "SaveSpend":
        from = "Savings";
        to = "Spending";
        break;
      case "SpendSave":
        to = "Savings";
        from = "Spending";
        break;
    }

    var header = "Set amount to be transfered";
    var subHeader = "From " + from + " to " + to;

    var buttons = [
      { text: 'Cancel',},
      {
        text: 'Save',
        handler: item => {
          this.transferAmt = parseInt(item.amt);
          this.canTransfer = true;
        }
      }
    ];
    var inputs = [
      {
        type: 'number',
        placeholder: "0.00",
        name: 'amt',
        value: this.transferAmt,
      }
    ];
    this.user.presentAlert({header, subHeader, buttons, inputs});
  }

  deductSpending(){
    this.addFunds('Deduct', 'Spending');
  }

  deductSavings(){
    this.addFunds('Deduct', 'Savings');
  }

  addSpending(){
    this.addFunds('Deposit', 'Spending');
  }

  addSavings(){
    this.addFunds('Deposit', 'Savings');
  }

  addFunds(action, type){
    var temp;
    if (action == "Deduct")
      temp = "From ";
    if (action == "Deposit")
      temp = "For ";
    
    var header = action + " amount";
    var subHeader = temp + type;

    var buttons = [
      { text: 'Cancel',},
      {
        text: 'Save',
        handler: item => {
          var funds = parseFloat(item.amt);
          if (action == "Deduct"){
            funds = - funds;
          }

          switch(type){
            case "Spending":
              this.mySpending += funds;
              break;
            case "Savings":
              this.mySavings += funds;
              break;
          }

          this.transactions.splice(0, 0, {
            amount: parseFloat(item.amt),
            note: type,
            date: (new Date()).toLocaleDateString(),
            type: action,
          })
        }
      }
    ];
    var inputs = [
      {
        type: 'number',
        placeholder: "0.00",
        name: 'amt',
      }
    ];
    this.user.presentAlert({header, subHeader, buttons, inputs});
  }

  showProjection(){
    var spent = 0, excess = 0;
    for (let i = 0; i < this.limits.length; i++){
      // excess = parseInt(this.limits[i].limit) - parseInt(this.limits[i].spent);
      excess = this.limits[i].limit - this.limits[i].spent;
      if (excess < 0)
        excess = 0.00;
      spent += excess;
    }
    return this.getAmt(this.mySpending - spent);
  }

  @ViewChild(IonModal) modal: IonModal;

  clear(){
    this.transactions = [];
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  getTransactionColor(t){
    if (t.type == "Deposit")
      return "success";
    if (t.type == "Deduct")
      return "danger";
  }
}