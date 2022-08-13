import { Component } from '@angular/core';
import { LanguagesService } from '../services/languages.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(public language: LanguagesService, public user: UserService) {}

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

  getCourse(course){
    return course.code + ": " + course.title;
  }

  colorCourse(course){
    if (course.semester == 'F')
      return 'success';
    if (course.semester == 'S')
      return 'secondary';
    if (course.semester == 'Y')
      return 'tertiary';  
  }

  removeCourse(courseIndex){
    this.courses.splice(courseIndex, 1);
  }

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
  }

  checkMood(mood){
    if (this.mood == mood.name)
      return mood.color;
    else
      return "";
  }

  courses: any[] = [];
  
  resetCourses(){
    this.courses = [
      {
        code: 'CSC301',
        title: 'Introduction to Software Engineering',
        semester: 'F',
      },
      {
        code: 'CSC318',
        title: 'Design of Interactive Computational Media',
        semester: 'F',
      },
      {
        code: 'CSC384',
        title: 'Introduction to Artificial Intelligence',
        semester: 'F',
      },
      {
        code: 'CSC458',
        title: 'Computer Networking Systems',
        semester: 'F',
      },
      {
        code: 'CSC485',
        title: 'Computational Linguistics',
        semester: 'F',
      },
      {
        code: 'EAS110',
        title: 'Modern Standard Korean I',
        semester: 'Y',
      },
      {
        code: 'CSC301',
        title: 'Introduction to Software Engineering',
        semester: 'S',
      },
      {
        code: 'CSC309',
        title: 'Programming on the Web',
        semester: 'S',
      },
      {
        code: 'CSC401',
        title: 'Natural Language Computing',
        semester: 'S',
      },
      {
        code: 'CSC488',
        title: 'Compilers and Interpreters',
        semester: 'S',
      },
    ]
  }

  dates = [
    {
      date: new Date(2022, 8 - 1, 6), // "Aug 06 2022",
      eventIDs: [0, 1, 2],
      active: false,
    },
    {
      date: new Date(2022, 8 - 1, 12), //"Aug 12 2022",
      eventIDs: [3],
      active: false,
    }
  ];

  dateToString(date){
    var locale = "en";
    var options = {month: 'short', day: '2-digit', year: 'numeric'};
    return date.toLocaleString(locale, options);
  }

  getEventsByID(eventIDs){
    
    var result = [];
    for (let i in eventIDs){
      console.log(eventIDs, i);
      result.push(this.events[eventIDs[i]]);
    }
    return result;
  }

  events = [{
    what: "Frescantes",
    who: ["Sareina", "Melissa", "Xaria", "Kianna"],
    where: "Italia",
    time: "11:30 PM",
    date: new Date(2022, 8 - 1, 6),
    active: false,
  },
  {
    what: "Lunch",
    who: ["Sareina", "Melissa", "Xaria", "Kianna"],
    where: "Zaccios",
    time: "12:30 PM",
    date: new Date(2022, 8 - 1, 6),
    active: false,
  },
  {
    what: "Movies",
    who: ["Sareina", "Melissa", "Xaria", "Mel's Sister"],
    where: "Limegrove",
    time: "4:30 PM",
    date: new Date(2022, 8 - 1, 6),
    active: false,
  },
  {
    what: "Birthday",
    who: ["Sareina"],
    where: "N/A",
    time: "N/A",
    date: new Date(2022, 8 - 1, 12),
    active: false,
  }];

  addEvent(){
    
  }

  setActive(date){
    var events = this.getEventsByID(date);
    for (let i in date.eventIDs){
      let id = date.eventIDs[i];
      this.events[id].active = !this.events[id].active;
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
      // case "date":
      //   data = event.date;
      //   break;
    }

    if (data == "N/A")
      return false;
    else
      return true;
  }

  checkIfFutureDate(date){
    var today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    return date.getTime() >= today.getTime();
  }

  checkIfPastDate(date){
    var today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);
    today.setMilliseconds(0);
    return date.getTime() < today.getTime();
  }

  showPast = false;

  checkEvents(date){
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
}
