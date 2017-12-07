import { Component, OnInit } from '@angular/core';
import {ScheduleItem} from '../shared/model/scheduleItem';
import {ScheduleService} from '../shared/model/schedule.service';
import {Receptum} from '../shared/model/receptum';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {
  schedule: ScheduleItem[];
  receptums: Receptum[];

  constructor(private scheduleService: ScheduleService) { }

  ngOnInit() {
    this.scheduleService.findAllScheduleItems()
    // .do(console.log)
      .subscribe(schedule => {
        schedule.map(item => {
          this.scheduleService.findAllReceptumsForSchedule(item.$key)
            .subscribe(receptums => {
              item.receptums = receptums;
            });
        });
        this.schedule = schedule;
      });
  }
}
