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
      day: 'Mon'
    },
    {
      id: 2,
      period: 'Morn',
      day: 'Tue'
    },
    {
      id: 3,
      period: 'Morn',
      day: 'Wed'
    },
    {
      id: 4,
      period: 'Morn',
      day: 'Thu'
    },
    {
      id: 5,
      period: 'Morn',
      day: 'Fri'
    },
    {
      id: 6,
      period: 'Morn',
      day: 'Sat'
    },
    {
      id: 7,
      period: 'Morn',
      day: 'Sun'
    },
    {
      id: 8,
      period: 'Noon',
      day: 'Mon'
    },
    {
      id: 9,
      period: 'Noon',
      day: 'Tue'
    },
    {
      id: 10,
      period: 'Noon',
      day: 'Wed'
    },
    {
      id: 11,
      period: 'Noon',
      day: 'Thu'
    },
    {
      id: 12,
      period: 'Noon',
      day: 'Fri'
    },
    {
      id: 13,
      period: 'Noon',
      day: 'Sat'
    },
    {
      id: 14,
      period: 'Noon',
      day: 'Sun'
    },
    {
      id: 15,
      period: 'Eve',
      day: 'Mon'
    },
    {
      id: 16,
      period: 'Eve',
      day: 'Tue'
    },
    {
      id: 17,
      period: 'Eve',
      day: 'Wed'
    },
    {
      id: 18,
      period: 'Eve',
      day: 'Thu'
    },
    {
      id: 19,
      period: 'Eve',
      day: 'Fri'
    },
    {
      id: 20,
      period: 'Eve',
      day: 'Sat'
    },
    {
      id: 21,
      period: 'Eve',
      day: 'Sun'
    },
    {
      id: 22,
      period: 'Bed',
      day: 'Mon'
    },
    {
      id: 23,
      period: 'Bed',
      day: 'Tue'
    },
    {
      id: 24,
      period: 'Bed',
      day: 'Wed'
    },
    {
      id: 25,
      period: 'Bed',
      day: 'Thu'
    },
    {
      id: 26,
      period: 'Bed',
      day: 'Fri'
    },
    {
      id: 27,
      period: 'Bed',
      day: 'Sat'
    },
    {
      id: 28,
      period: 'Bed',
      day: 'Sun'
    },
  ];
  portions: [
    {
      name: 'Fluanxol',
      dose: 100,
      number: 1,
      shedule: [1, 3]
    },
    {
      name: 'Amitryptylin',
      dose: 500,
      number: 2,
      shedule: [7, 3]
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
