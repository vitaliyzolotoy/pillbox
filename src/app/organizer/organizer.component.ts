import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {
  shedule = [
    {
      period: 'Morn',
      day: 'Mon'
    },
    {
      period: 'Morn',
      day: 'Tue'
    },
    {
      period: 'Morn',
      day: 'Wed'
    },
    {
      period: 'Morn',
      day: 'Thu'
    },
    {
      period: 'Morn',
      day: 'Fri'
    },
    {
      period: 'Morn',
      day: 'Sat'
    },
    {
      period: 'Morn',
      day: 'Sun'
    },
    {
      period: 'Noon',
      day: 'Mon'
    },
    {
      period: 'Noon',
      day: 'Tue'
    },
    {
      period: 'Noon',
      day: 'Wed'
    },
    {
      period: 'Noon',
      day: 'Thu'
    },
    {
      period: 'Noon',
      day: 'Fri'
    },
    {
      period: 'Noon',
      day: 'Sat'
    },
    {
      period: 'Noon',
      day: 'Sun'
    },
    {
      period: 'Eve',
      day: 'Mon'
    },
    {
      period: 'Eve',
      day: 'Tue'
    },
    {
      period: 'Eve',
      day: 'Wed'
    },
    {
      period: 'Eve',
      day: 'Thu'
    },
    {
      period: 'Eve',
      day: 'Fri'
    },
    {
      period: 'Eve',
      day: 'Sat'
    },
    {
      period: 'Eve',
      day: 'Sun'
    },
    {
      period: 'Bed',
      day: 'Mon'
    },
    {
      period: 'Bed',
      day: 'Tue'
    },
    {
      period: 'Bed',
      day: 'Wed'
    },
    {
      period: 'Bed',
      day: 'Thu'
    },
    {
      period: 'Bed',
      day: 'Fri'
    },
    {
      period: 'Bed',
      day: 'Sat'
    },
    {
      period: 'Bed',
      day: 'Sun'
    },
  ];

  constructor() { }

  ngOnInit() {
  }

}
