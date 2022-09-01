import { Component, ViewChild } from '@angular/core';
import { IonReorderGroup, ItemReorderEventDetail } from '@ionic/angular';
import { LanguagesService } from '../services/languages.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  
  @ViewChild(IonReorderGroup) reorderGroup: IonReorderGroup;

  constructor(public language: LanguagesService, public user: UserService) {
    setTimeout(() => {
      this.retrieveData();
    }, 500);
    
    this.user.removeFading();
    // this.dates = [
    //   {
    //     date: new Date(2022, 8 - 1, 6), // "Aug 06 2022",
    //     eventIDs: [0, 1, 2],
    //     active: false,
    //   },
    //   {
    //     date: new Date(2022, 8 - 1, 12), //"Aug 12 2022",
    //     eventIDs: [3],
    //     active: false,
    //   }
    // ];
  
    // this.dateMap.set("Aug 06, 2022", 0);
    // this.dateMap.set("Aug 12, 2022", 1);
    
    // this.events = [{
    //   what: "Frescantes",
    //   who: ["Sareina", "Melissa", "Xaria", "Kianna"],
    //   where: "Italia",
    //   time: "11:30 PM",
    //   date: new Date(2022, 8 - 1, 6),
    //   active: false,
    // },
    // {
    //   what: "Lunch",
    //   who: ["Sareina", "Melissa", "Xaria", "Kianna"],
    //   where: "Zaccios",
    //   time: "12:30 PM",
    //   date: new Date(2022, 8 - 1, 6),
    //   active: false,
    // },
    // {
    //   what: "Movies",
    //   who: ["Sareina", "Melissa", "Xaria", "Mel's Sister"],
    //   where: "Limegrove",
    //   time: "4:30 PM",
    //   date: new Date(2022, 8 - 1, 6),
    //   active: false,
    // },
    // {
    //   what: "Birthday",
    //   who: ["Sareina"],
    //   where: "N/A",
    //   time: "N/A",
    //   date: new Date(2022, 8 - 1, 12),
    //   active: false,
    // }];
  }

  displayCurrentDate(){
    return this.user.getDate('daydate');
  }

  getLabel(name){
    return this.language.getLabel(name);
  }

  getAvatar(){
    return this.user.getAvatar();
  }

  show: string = "None";

  setShow(what){
    if (this.show != what)
      this.show = what;
    else
      this.show = "None";
  }

  // courses: Array<{code: string, title: string, semester: string}> = [];
  
  // resetCourses(){
  //   this.courses = [
  //     {
  //       code: 'CSC301',
  //       title: 'Introduction to Software Engineering',
  //       semester: 'F',
  //     },
  //     {
  //       code: 'CSC318',
  //       title: 'Design of Interactive Computational Media',
  //       semester: 'F',
  //     },
  //     {
  //       code: 'CSC384',
  //       title: 'Introduction to Artificial Intelligence',
  //       semester: 'F',
  //     },
  //     {
  //       code: 'CSC458',
  //       title: 'Computer Networking Systems',
  //       semester: 'F',
  //     },
  //     {
  //       code: 'CSC485',
  //       title: 'Computational Linguistics',
  //       semester: 'F',
  //     },
  //     {
  //       code: 'EAS110',
  //       title: 'Modern Standard Korean I',
  //       semester: 'Y',
  //     },
  //     {
  //       code: 'CSC301',
  //       title: 'Introduction to Software Engineering',
  //       semester: 'S',
  //     },
  //     {
  //       code: 'CSC309',
  //       title: 'Programming on the Web',
  //       semester: 'S',
  //     },
  //     {
  //       code: 'CSC401',
  //       title: 'Natural Language Computing',
  //       semester: 'S',
  //     },
  //     {
  //       code: 'CSC488',
  //       title: 'Compilers and Interpreters',
  //       semester: 'S',
  //     },
  //   ]
  // }

  // getCourse(course){
  //   return course.code + ": " + course.title;
  // }

  // colorCourse(course){
  //   if (course.semester == 'F')
  //     return 'success';
  //   if (course.semester == 'S')
  //     return 'secondary';
  //   if (course.semester == 'Y')
  //     return 'tertiary';
  // }

  // removeCourse(courseIndex){
  //   this.courses.splice(courseIndex, 1);
  // }

  moods: any[] = [
    {
      name: "Elated",
      icon: "sparkles-outline",
      color: "success",
    },
    {
      name: "Happy",
      icon: "happy-outline",
      color: "warning",
    },
    {
      name: "Sad",
      icon: "sad-outline",
      color: "danger",
    },
  ]

  mood: string = "Elated";

  changeMood(mood){
    this.mood = mood;
    this.setOpen(false);
  }

  checkMood(mood){
    if (this.mood == mood.name)
      return mood.color;
    else
      return "";
  }
  

  dates: Array<{
    date: Date,
    // eventIDs: number[],
    eventIDs: any[],
    active: boolean
  }> = [];

  dateToString(date){
    date = new Date(date);
    var locale = this.language.myLanguage.code;
    var options = {month: 'short', day: '2-digit', year: 'numeric'};
    return date.toLocaleString(locale, options);
  }

  events: Array<{
    what: string
    who: string[],
    where: string,
    time: string,
    date: Date,
    active: boolean,
  }> = [];
  
  getEventsByID(eventIDs){
    // var result = [];

    // for (let i in eventIDs){
    //   result.push(this.events[eventIDs[i]]);
    // }
    // return result;

    return eventIDs;
  }

  setActive(date){
    // var events = this.getEventsByID(date);
    for (let i in date.eventIDs){
      // let id = date.eventIDs[i];
      // this.events[id].active = !this.events[id].active;
      date.eventIDs[i].active = !date.eventIDs[i].active;
    }
    // date.active = !date.active;
  }

  checkInfoValdity(event, attribute){
    // difference between var and let
    if (!event.active){
      return false;
    }

    var data = "N/A";

    switch(attribute){
      // case "what":
      //   data = event.what;
      //   break;
      case "who":
        data = event.who;
        break;
      case "where":
        data = event.where;
        break;
      case "time":
        data = event.time;
        break;
      default:
        data = "default";
        break;
      // case "date":
      //   data = event.date;
      //   break;
    }

    if (data == "N/A")
      return false;
    else
      return true;
  }

  getCurrentDate(){
    var today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    return today.getTime();
  }

  checkIfPastDate(date){
    return date.getTime() < this.getCurrentDate();
  }

  checkIfFutureDate(date){
    return date.getTime() >= this.getCurrentDate();
  }

  showPast = false;

  checkEvents(date){
    date = new Date(date);
    if (this.showPast){
      return this.checkIfPastDate(date);
    }
    else{
      return this.checkIfFutureDate(date);
    }
  }
  
  tooglePast(){
    this.showPast = !this.showPast;
  }


  listBy = "dates";

  setListBy(what){
    if (what == "dates" || what == "events"){
      this.listBy = what;
    }
    else{
      if (this.listBy == "dates"){
        this.listBy = "events";
      }
      else if (this.listBy == "events"){
        this.listBy = "dates";
      }
    }
    this.language.displayTab3Toast('groupBy', this.listBy);
  }

  isModalOpen: boolean = false;

  setOpen(bool){
    this.isModalOpen = bool;
  }

  // toggleModal(){
  //   this.setOpen(!this.isModalOpen);
  //   return this.isModalOpen;
  // }
  
  eventTitle: string = "";
  eventPeople: string = "";
  eventLocation: string = "";
  eventDate = undefined;
  eventAllDay: boolean = true;
  eventDateString: string = "";
  
  resetInputs(){
    this.eventTitle = "";
    this.eventPeople = "";
    this.eventLocation = "";
    this.eventDate = undefined;
    this.eventAllDay = true;
    this.eventDateString = "";
  }

  checkNoInput(variable){
    if (variable == "" || variable == undefined){
      return "N/A";
    }
    return variable;
  }

  displayEventDateInput(){
    if (this.eventDate == undefined)
      if (this.eventDateString == "")
        return "Select a start date and time below.";
      else
        return this.stringISOdate(this.eventDateString);
    else
      return this.stringISOdate(this.eventDate);
  }

  stringISOdate(date){
    let newDate = new Date(date);
    if (this.eventAllDay)
      return newDate.toLocaleDateString();
    else
      return newDate.toLocaleString();
  }
  
  checkIfAllDay(event){
    if (event.time == "N/A")
      return this.eventAllDay = true;
    else
      return this.eventAllDay = false;
  }
  
  addEvent(){
    if (this.isModalOpen){
      this.setOpen(false);
      return;
    }
    this.resetInputs();
    this.setOpen(true);
  }

  editEvent(event){
    this.copyEvent(event);
    this.deleteEventHelper(event);
  }

  deleteEvent(event){ //combine all alert presnters
    var header = 'Are you sure you want to delete this event "' + event.what + '"?';
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
          this.deleteEventHelper(event);
        },
        cssClass: 'alert-button-confirm'
      }
    ]
    var inputs = [];
    this.language.presentAlert({header, subHeader, buttons, inputs});
  }

  deleteEventHelper(event){
    let placeholder = {
      what: "",
      who: [],
      where: "",
      time: "",
      date: new Date(2022, 8 - 1, 6),
      active: false,
    };

    this.deleteEventDate(event.date, event);
    let eventID = this.events.indexOf(event);
    this.events.splice(eventID, 1, placeholder);
    this.emptyEventSlots.push(eventID);
    
    this.saveData();
  }

  emptyEventSlots: number[] = [];

  getEventIndex(event){
    return this.events.indexOf(event);
  }

  deleteEventDate(date, event){
    let dateString = this.dateToString(date);
    let dateIndex = this.dateMap.get(dateString);

    let deleteID = dateIndex.eventIDs.indexOf(event);
    dateIndex.eventIDs.splice(deleteID, 1);

    if (dateIndex.eventIDs.length == 0){
      this.dateMap.delete(dateString);

      this.dates.splice(this.dates.indexOf(dateIndex), 1);
      // for (let i = dateIndex; i < this.dates.length; i++){
      //   dateString = this.dateToString(this.dates[i].date);
      //   this.dateMap.set(dateString, i);
      // }
    }
  }

  copyEvent(event){
    if (this.isModalOpen){
      this.setOpen(false);
      return;
    }
    this.setOpen(true);
    this.eventTitle = event.what;
    this.eventPeople = event.who[0];
    this.eventLocation = event.where;
    this.eventDateString = event.date.toLocaleString();
    this.eventDate = event.date;
    this.eventAllDay = this.checkIfAllDay(event);
  }

  dismiss(){
    // this.saveEvent();
    this.setOpen(false);
  }

  saveEvent(){
    let eventDate = undefined;
    if (this.eventDate == undefined && this.eventDateString != "")
      eventDate = this.eventDateString;
    else
      eventDate = this.eventDate;

    let newEvent = {
      what: this.checkNoInput(this.eventTitle),
      who: [this.checkNoInput(this.eventPeople)],
      where: this.checkNoInput(this.eventLocation),
      time: this.extractTime(eventDate),
      date: eventDate,
      active: false,
    };

    let eventId = this.events.length;;
    if (this.emptyEventSlots.length != 0){
      eventId = this.emptyEventSlots.pop();
      this.events.splice(eventId, 1, newEvent);
    }
    else
      this.events.push(newEvent);
    
    
    this.saveEventDate(eventDate, newEvent);

    this.setOpen(false);

    this.saveData();
  }

  saveEventDate(date, event){
    let dateString = this.dateToString(date);
    let dateIndex = this.dateMap.get(dateString);
    
    if (dateIndex == undefined){
      let newDate = {
        date: new Date(date), // keep new Date()?
        eventIDs: [event],
        active: false,
      };
      this.dateMap.set(dateString, newDate);
      this.dates.push(newDate);
    }
    else{
      dateIndex.eventIDs.push(event);
    }
  }

  dateMap = new Map();

  extractTime(ISOdate){
    if (this.eventAllDay){
      return "N/A";
    }

    let fullDate = new Date(ISOdate);
    let hours = fullDate.getHours();
    let zero = "";
    let minutes = fullDate.getMinutes();
    let timeOfDay = "AM";
    if (hours >= 12){
      timeOfDay = "PM";
      if (hours != 12)
        hours -= 12;
    }
    if (minutes < 10) zero = "0";
    return hours + ":" + zero + minutes + " " + timeOfDay;
    // return ISOdate.substr(ISOdate.length - 14);
  }
  
  clearEvents(){
    var header = 'Are you sure you want to delete all events?';
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
          this.clearEventsHelper();
        },
        cssClass: 'alert-button-confirm'
      }
    ]
    var inputs = [];
    this.language.presentAlert({header, subHeader, buttons, inputs});
  }

  clearEventsHelper(){
    this.events = [];
    this.dates = [];
    this.dateMap = new Map();
    this.emptyEventSlots = [];
    this.language.displayTab3Toast('clear');
    this.saveData();
  }

  
  retrieveData(){
    let data = this.user.tab3events;
    this.events = data.events;
    this.dates = data.dates;
    this.dateMap = data.dateMap;

    // remove after update
    let dateStr = this.dateToString(this.dates[0].date);
    if (typeof(this.dateMap.get(dateStr)) === "number"){
      for (let i = 0; i < this.dates.length; i++){
        let dateString = this.dateToString(this.dates[i].date);
        this.dateMap.set(dateString, this.dates[i]);

        let eventIDs = this.dates[i].eventIDs;
        for (let i = 0; i < eventIDs.length; i++){
          eventIDs[i] = this.events[eventIDs[i]];
        }
      }
    }

    this.emptyEventSlots = data.emptyEventSlots;
  }
  
  saveData(){
    this.user.setTab3Info({
      events: this.events,
      dates: this.dates,
      dateMap: this.dateMap,
      emptyEventSlots: this.emptyEventSlots,
    });
    this.user.saveTab3Info();
  }

  disableReorder: boolean = false;
  doReorder(ev: CustomEvent<ItemReorderEventDetail>, type) {
    switch(type){
      case 'dates':
        this.dates = ev.detail.complete(this.dates);
        break;
      case 'events':
        this.events = ev.detail.complete(this.events);
    } 
  }

  reorderDates(ev: CustomEvent<ItemReorderEventDetail>) {
    this.doReorder(ev, 'dates');
  }

  reorderEvents(ev: CustomEvent<ItemReorderEventDetail>) {
    this.doReorder(ev, 'events');
  }

  // toggleReorder(){
  //   this.disableReorder = !this.disableReorder;
  // }
}

// "8/6/2022, 12:00:00 AM"