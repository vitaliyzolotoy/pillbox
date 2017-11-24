import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {
  shedule = [
    {
      id: 1,
      period: 'Morn',
      day: 'Mon',
      portions: []
    },
    {
      id: 2,
      period: 'Morn',
      day: 'Tue',
      portions: []
    },
    {
      id: 3,
      period: 'Morn',
      day: 'Wed',
      portions: []
    },
    {
      id: 4,
      period: 'Morn',
      day: 'Thu',
      portions: []
    },
    {
      id: 5,
      period: 'Morn',
      day: 'Fri',
      portions: []
    },
    {
      id: 6,
      period: 'Morn',
      day: 'Sat',
      portions: []
    },
    {
      id: 7,
      period: 'Morn',
      day: 'Sun',
      portions: []
    },
    {
      id: 8,
      period: 'Noon',
      day: 'Mon',
      portions: []
    },
    {
      id: 9,
      period: 'Noon',
      day: 'Tue',
      portions: []
    },
    {
      id: 10,
      period: 'Noon',
      day: 'Wed',
      portions: []
    },
    {
      id: 11,
      period: 'Noon',
      day: 'Thu',
      portions: []
    },
    {
      id: 12,
      period: 'Noon',
      day: 'Fri',
      portions: []
    },
    {
      id: 13,
      period: 'Noon',
      day: 'Sat',
      portions: []
    },
    {
      id: 14,
      period: 'Noon',
      day: 'Sun',
      portions: []
    },
    {
      id: 15,
      period: 'Eve',
      day: 'Mon',
      portions: []
    },
    {
      id: 16,
      period: 'Eve',
      day: 'Tue',
      portions: []
    },
    {
      id: 17,
      period: 'Eve',
      day: 'Wed',
      portions: []
    },
    {
      id: 18,
      period: 'Eve',
      day: 'Thu',
      portions: []
    },
    {
      id: 19,
      period: 'Eve',
      day: 'Fri',
      portions: []
    },
    {
      id: 20,
      period: 'Eve',
      day: 'Sat',
      portions: []
    },
    {
      id: 21,
      period: 'Eve',
      day: 'Sun',
      portions: []
    },
    {
      id: 22,
      period: 'Bed',
      day: 'Mon',
      portions: []
    },
    {
      id: 23,
      period: 'Bed',
      day: 'Tue',
      portions: []
    },
    {
      id: 24,
      period: 'Bed',
      day: 'Wed',
      portions: []
    },
    {
      id: 25,
      period: 'Bed',
      day: 'Thu',
      portions: []
    },
    {
      id: 26,
      period: 'Bed',
      day: 'Fri',
      portions: []
    },
    {
      id: 27,
      period: 'Bed',
      day: 'Sat',
      portions: []
    },
    {
      id: 28,
      period: 'Bed',
      day: 'Sun',
      portions: []
    },
  ];
  portions = [
    {
      name: 'Fluanxol',
      dose: 100,
      number: 1,
      shedule: [1, 3, 20]
    },
    {
      name: 'Amitryptylin',
      dose: 500,
      number: 2,
      shedule: [7, 3]
    },
    {
      name: 'Depakine',
      dose: 200,
      number: 1,
      shedule: [3]
    },
    {
      name: 'Zolofren',
      dose: 100,
      number: 0.5,
      shedule: [3]
    }
  ];

  constructor() { }

  ngOnInit() {
    this.shedule.map(period => {
      return period.portions = this.portions.filter(item => {
        return item.shedule.includes(period.id);
      });
    });
  }

}
