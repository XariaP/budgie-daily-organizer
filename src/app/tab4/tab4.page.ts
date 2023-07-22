import { Component, OnInit, ViewChild } from '@angular/core';
import { LanguagesService } from '../services/languages.service';
import { UserService } from '../services/user.service';

import { IonReorderGroup } from '@ionic/angular';
import { ItemReorderEventDetail } from '@ionic/core';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;

  constructor(public language: LanguagesService, public user: UserService) {
  }

  ngOnInit() {
    setTimeout(() => {
      this.retrieveData();
    }, 500);
    
    this.user.removeFading();
  }

  today: Date = new Date();
  
  days: Array<{
    val: string,
    checked: boolean,
    short: string
  }> = this.language.days; 

  frequency: Array<{
    val: string,
    color: string,
    days: boolean[],
  }> = [
    {val: "Custom", color: "secondary", days: [false, false, false, false, false, false, false]},
    {val: "Weekdays", color: "danger", days: [false, true, true, true, true, true, false]},
    {val: "Weekends", color: "warning", days: [true, false, false, false, false, false, true]},
    {val: "Everyday", color: "success", days: [true, true, true, true, true, true, true, true]},
  ];

  routines: Array<{
    what: string,
    location: string,
    desc: string,
    timeslots: Array<{
      starttime: Date,
      endtime: Date,
      freq_active: {
        val: string,
        color: string,
        days: boolean[],
      },
      active: boolean,
    }>,
    tag: {val: string, color: string},
  }> = [];

  addRoutine(){
    if (this.isModalOpen){
      this.setOpen(false);
      return;
    }
    this.setOpen(true);
    this.timeslots = [];
    this.addTimeslot()
    this.activity = "";
    this.tag = "Routine danger";
  }

  moreTime(){
    let date = new Date();
    date.setHours(date.getHours() + 1);
    return date;
  }

  currentDay = this.today.getDay();
  
  nextDay(){
    this.currentDay++;
    if (this.currentDay == this.days.length)
      this.currentDay = -1;
  }

  changeDay(){
    let header = "Which day would you like to view?";
    let subHeader = "";
    let buttons = [
      // {text: 'Cancel', role: 'cancel'},
      {
        text: 'Select',
        cssClass: "select-button",
        handler: choice => {
        this.currentDay = choice;
      }},
      {
        text: this.language.getLabel("today"),
        cssClass: "choice-button",
        handler: () => {
        this.currentDay = this.today.getDay();
      }},
      {
        text: 'View All Routines',
        cssClass: 'choice-button',
        handler:() => {
          this.currentDay = -1;
      }},
    ];
    let inputs = [
    //   {
    //   label: "All Routines",
    //   type: 'radio',
    //   value: -1,
    //   checked: (this.currentDay == -1),
    //   cssClass: "alertInput",
    // }
    ]

    for (let i = 0; i < this.days.length; i++){
      inputs.push({
        label: this.days[i].val,
        type: 'radio',
        value: i,
        checked: (this.currentDay == i),
        cssClass: "alertInput",
      });
    }
    this.user.presentAlert({header, subHeader, buttons, inputs});
  }

  getDayOfWeek(daynum){
    if (daynum == -1)
      return "All Routines";
    else
      return this.days[daynum].val;
  }

  getDayOfWeekShort(daynum){
    return this.days[daynum].short;
  }

  getTime(date: Date){
    let lang = this.language.myLanguage.code;
    return date.toLocaleTimeString(lang, { hour: '2-digit', minute: '2-digit'});
  }

  getStartTime(timeslot){
    if (timeslot.starttime == undefined)
      return "Anytime";
    return this.getTime(new Date(timeslot.starttime));
  }

  getEndTime(timeslot){
    if (timeslot.endtime == undefined)
      return "Anytime";
    return this.getTime(new Date(timeslot.endtime));
  }


  edit = true;
  collapse = false;

  betweenTime(from, until){
    if (from == undefined || until == undefined)
      return false;

    console.log(from, until, "start");
    from = new Date(from);
    until = new Date(until);
    console.log(from, until, "End");
    var between = false;

    var now: any = (new Date()).toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit', hour12: false});
    var start = from.toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit', hour12: false});
    var end = until.toLocaleTimeString('en', { hour: '2-digit', minute: '2-digit', hour12: false});

    now = now.toString().split(":");
    start = start.toString().split(":");
    end = end.toString().split(":");
    console.log(now, start, end);
    let hours = parseInt(now[0]);
    let mins = parseInt(now[1]);
    start[0] = parseInt(start[0]);
    start[1] = parseInt(start[1]);
    end[0] = parseInt(end[0]);
    end[1] = parseInt(end[1]);    

    console.log(start[0], end[0]);
    if (start[0] == end[0]){
      if (hours == start[0] && mins >= start[1] && mins < end[1])
        between = true;
    }
    else if (start[0] < end[0]){
      if (hours > start[0] && hours < end[0])
        between = true;
      if (hours == start[0] && mins >= start[1])
        between = true;
      if (hours == end[0] && mins < end[1])
        between = true;
    }
    return between;
  }

  checkToday(timeslot){
    let weekday = this.currentDay;
    return timeslot.freq_active.days[weekday];
  }

  doReorder(ev: CustomEvent<ItemReorderEventDetail>) {
    // console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);
    this.routines = ev.detail.complete(this.routines);
  }

  showAll(){
    // if (this.currentDay != -1){
    //   this.currentDay = -1;
    //   this.language.displayTab4Toast('all');
    // }
    // else{
      this.collapse = !this.collapse;
      if (this.collapse)
        this.language.displayTab4Toast('mini');
      else
        this.language.displayTab4Toast('expand');
    // }
  }

  saved_tags: any = [
    {val: "Routine", color: "danger"},
    {val: "Work", color: "neon"},
    {val: "School", color: "success"},
    {val: "Break", color: "lilac"},
    {val: "Club", color: "violet"},
    {val: "Hobby", color: "pink"},
    {val: "Miscellaneous", color: "teal"},
  ];

  isModalOpen: boolean = false;

  setOpen(bool){
    this.isModalOpen = bool;
  }

  activity: string = "";

  location: string = "";

  description: string = "";

  timeslots: Array<{
    starttime: Date,
    endtime: Date,
    freq_active: {
      val: string,
      color: string,
      days: boolean[],
    }
    active: boolean,
  }> = [];

  tag = this.saved_tags[0].val + " " + this.saved_tags[0].color;

  addTimeslot(){
    let newslot = {
      starttime: undefined,
      endtime: undefined,
      freq_active: {val: "Custom", color: "secondary", days: [false, false, false, false, false, false, false]},
      active: true,
    }
  
    this.timeslots.push(newslot);
  }

  updateFrequency(timeslotID, freq_opt){
    this.timeslots[timeslotID].freq_active.val = freq_opt.val;
    this.timeslots[timeslotID].freq_active.color = freq_opt.color;
    if (freq_opt.val != "Custom"){
      this.timeslots[timeslotID].freq_active.days = freq_opt.days.slice(0, 7);
    }
  }

  checkIfDayChecked(freq, daynum){
    if (freq.days.indexOf(daynum) == -1)
      return false;
    else
      return true;
  }

  checkIfFreqSelected(timeslot, freq){
    if (timeslot.freq_active.val == freq.val)
      return freq.color;
    else
      return "";
  }

  saveRoutine(){
    for (let i = 0; i < this.timeslots.length; i++){
      // if (!this.timeslots[i].starttime || !this.timeslots[i].endtime){
      //   this.language.displayTab4Toast('invalidTime');
      //   return;
      // }
    }
    this.setOpen(false);

    this.routines.push({
      what: this.activity,
      location: this.location,
      desc: this.description,
      timeslots: this.timeslots,
      tag: this.createTag(this.tag),
    });
    this.saveData();
  }

  createTag(tagInfo){
    let data = tagInfo.split(" ");
    return {val: data[0], color: data[1]};
  }

  createTagString(tag){
    return tag.val + " " + tag.color;
  }

  lastSave = undefined;

  deleteRoutine(ID){
    var header = 'Are you sure you want to delete your "' + this.routines[ID].what + '" routine?';
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
          this.deleteRoutineHelper(ID);
        },
        cssClass: 'alert-button-confirm'
      }
    ]
    var inputs = [];
    this.language.presentAlert({header, subHeader, buttons, inputs});
  }

  deleteRoutineHelper(ID){
    this.routines.splice(ID, 1);
    this.saveData();
  }

  editRoutine(ID){
    this.setOpen(true);
    this.timeslots = this.routines[ID].timeslots;
    this.activity = this.routines[ID].what;
    this.location = this.routines[ID].location;
    this.description = this.routines[ID].desc;
    this.tag = this.createTagString(this.routines[ID].tag);
    this.lastSave = {ID: ID, data: this.routines[ID]};
    this.deleteRoutineHelper(ID);
  }

  cancel(){
    this.setOpen(false);
    if (this.lastSave != undefined){
      this.routines.splice(this.lastSave.ID, 0, this.lastSave.data);
    }
  }

  editOrDelete(ID){
    if (this.edit){
      this.editRoutine(ID);
    }
    else{
      this.deleteRoutine(ID);
    }
  }

  toggleEdit(){
    let icon;
    this.edit = !this.edit;
    if (this.edit)
      icon = "edit";
    else
      icon = "delete";

    this.language.displayTab4Toast(icon);
  }

  displayTimeInput(time){
    if (time == undefined)
      return "Tap here to select time";
    else
      return this.getTime(new Date(time));
  }

  getCurrentRoutineColor(){
    return this.createTag(this.tag).color;
  }

  retrieveData(){
    this.routines = this.user.tab4routines;
  }
  
  saveData(){
    this.user.setTab4Info(this.routines);
    this.user.saveTab4Info();
  }

  getAvatar(){
    return this.user.getAvatar();
  }


  getLocation(card){
    let location = card.location;
    if (location == "" || location == undefined)
      return "";
    else
      return "(" + location + ")";
  }

  getDesc(card){
    return card.desc;
  }

  clearAll(){
    var header = 'Are you sure you want to delete all routines?';
    var subHeader = "";
    var buttons = [
      {
        text: 'Cancel',
        role: 'cancel',
        // cssClass: 'alert-button-cancel'
        cssClass: 'save-button'
      },
      {
        text:'OK',
        handler: () => {  
          this.routines = [];
          this.saveData();
        },
        // cssClass: 'alert-button-confirm'
        cssClass: 'delete-button'
      }
    ]
    var inputs = [];
    this.language.presentAlert({header, subHeader, buttons, inputs});
  }
}
