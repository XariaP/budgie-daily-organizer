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

  constructor(public language: LanguagesService, public user: UserService) { }

  ngOnInit() {
  }

  today: Date = new Date();
  daynums: any = {SUN:0, M:1, T:2, W:3, TH:4, F:5, SAT:6};

  days = [
    {val: "Sunday", checked: false, short: "SUN"},
    {val: "Monday", checked: false, short: "MON"},
    {val: "Tuesday", checked: false, short: "TUE"},
    {val: "Wednesday", checked: false, short: "WED"},
    {val: "Thursday", checked: false, short: "THU"},
    {val: "Friday", checked: false, short: "FRI"},
    {val: "Saturday", checked: false, short: "SAT"},
  ];

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
    this.setOpen(true);
    this.timeslots = [];
    this.addTimeslot()
    this.activity = "";
    this.tagID = 0;
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
    // console.log(this.currentDay, this.days.length);
  }

  changeDay(){
    let header = "Which day's timetable would you like to view?";
    let subHeader = "";
    let buttons = [
      // {text: 'Cancel', role: 'cancel'},
      // {text: 'All'},
      {
        text: 'Today',
        cssClass: "alertButton",
        handler: () => {
        this.currentDay = this.today.getDay();
      }},
      {
        text: 'Select',
        cssClass: "alertButton",
        handler: choice => {
        this.currentDay = choice;
      }}
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

  getTime(date: Date){
    // console.log(date);
    let lang = this.language.myLanguage.code;
    return date.toLocaleTimeString(lang, { hour: '2-digit', minute: '2-digit'});
  }

  getStartTime(timeslot){
    return this.getTime(new Date(timeslot.starttime));
  }

  getEndTime(timeslot){
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
    console.log(between);
    // else{
    //   if (hours > start[0] || hours < end[0])
    //     between = true;
    //   if (hours == start[0] && mins >= start[1])
    //     between = true;
    //   if (hours == end[0] && mins < end[1])
    //     between = true;
    // }
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
    if (this.currentDay != -1){
      this.currentDay = -1;
      this.language.displayTab4Toast('all');
    }
    else{
      this.collapse = !this.collapse;
      if (this.collapse)
        this.language.displayTab4Toast('expand');
      else
        this.language.displayTab4Toast('mini');
    }
  }

  saved_tags: any = [
    {val: "Routine", color: "danger"},
    {val: "Work", color: "neon"},
    {val: "School", color: "success"},
    {val: "Recreation", color: "pink"},
    {val: "Break", color: "lilac"},
    {val: "Hobby", color: "teal"},
    {val: "Club", color: "violet"},
  ];

  isModalOpen: boolean = false;

  setOpen(bool){
    this.isModalOpen = bool;
  }

  activity: string = "j";

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

  tagID: number = 0;

  // setTag(val, color){
  //   this.tag.val = val;
  //   this.tag.color = color;
  //   return this.tag;
  // }

  addTimeslot(){
    // this.timeslots = [];
    let newslot = {
      starttime: undefined,
      endtime: undefined,
      freq_active: {val: "Custom", color: "secondary", days: [false, false, false, false, false, false, false]},
      active: true,
    }
  
    this.timeslots.push(newslot);
  }

  updateFrequency(timeslotID, freq_opt){
    // console.log(this.timeslots[timeslotID].freq_active);
    this.timeslots[timeslotID].freq_active.val = freq_opt.val;
    this.timeslots[timeslotID].freq_active.color = freq_opt.color;
    if (freq_opt.val != "Custom"){
      this.timeslots[timeslotID].freq_active.days = freq_opt.days.slice(0, 7);
    }
    // console.log(this.timeslots[timeslotID].freq_active);
    // console.log(this.frequency);
  }

  checkIfDayChecked(freq, daynum){
    // console.log(freq, daynum);
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
      if (!this.timeslots[i].starttime || !this.timeslots[i].endtime)
        //toast
        return;
      // this.timeslots[i].starttime = new Date(this.timeslots[i].starttime);
      // this.timeslots[i].endtime = new Date(this.timeslots[i].endtime);
      // console.log(this.timeslots[i].endtime);
    }
    this.setOpen(false);

    this.routines.push({
      what: this.activity,
      timeslots: this.timeslots,
      tag: this.saved_tags[this.tagID],
    });
  }

  lastSave = undefined;

  deleteRoutine(ID){
    this.routines.splice(ID, 1);
  }

  editRoutine(ID){
    this.setOpen(true);
    this.timeslots = this.routines[ID].timeslots;
    this.activity = this.routines[ID].what;
    this.tagID = this.saved_tags.indexOf(this.routines[ID].tag);
    this.lastSave = {ID: ID, data: this.routines[ID]};
    this.deleteRoutine(ID);
  }

  cancel(){
    this.setOpen(false);
    this.routines.splice(this.lastSave.ID, 0, this.lastSave.data);
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

}
