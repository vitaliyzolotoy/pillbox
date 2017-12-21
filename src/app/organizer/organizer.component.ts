import {Component, Input, OnInit} from '@angular/core';
import {ScheduleItem} from '../shared/model/scheduleItem';
import {ScheduleService} from '../shared/model/schedule.service';
import {Receptum} from '../shared/model/receptum';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {
  @Input() uid;
  schedule: ScheduleItem[];
  receptums: Receptum[];

  constructor(private scheduleService: ScheduleService) { }

  ngOnInit() {
    this.scheduleService.findAllScheduleItems()
    // .do(console.log)
      .subscribe(schedule => {
        schedule.map(item => {
          item.week = [
            {
              name: 'Mon',
              receptums: []
            },
            {
              name: 'Tue',
              receptums: []
            },
            {
              name: 'Wed',
              receptums: []
            },
            {
              name: 'Thu',
              receptums: []
            },
            {
              name: 'Fri',
              receptums: []
            },
            {
              name: 'Sat',
              receptums: []
            },
            {
              name: 'Sun',
              receptums: []
            }
          ];

          this.scheduleService.findAllReceptumsForSchedule(item.$key, this.uid)
            .subscribe(receptums => {
              receptums.map(receptum => {
                if (receptum.repeat) {
                  item.week.map(day => {
                    return day.receptums.push(receptum);
                  });
                } else {
                  item.week.map(day => {
                    if (day.name === receptum.day) {
                      return day.receptums.push(receptum);
                    }
                  });
                }
              });
            });
        });
        this.schedule = schedule;
      });
  }
}
