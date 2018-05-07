import {Component, Input, OnInit} from '@angular/core';
import {ScheduleItem} from '../shared/model/scheduleItem';
import {ScheduleService} from '../shared/model/schedule.service';
import {Receptum} from '../shared/model/receptum';
import {PaymentService} from '../shared/payment/payment.service';

@Component({
  selector: 'app-organizer',
  templateUrl: './organizer.component.html',
  styleUrls: ['./organizer.component.scss']
})
export class OrganizerComponent implements OnInit {
  @Input() uid;
  @Input() visibility;
  schedule: ScheduleItem[];
  receptums: Receptum[];
  isLoaded = false;
  status;
  trial;

  constructor(private scheduleService: ScheduleService,
              public paymentService: PaymentService) { }

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

          this.isLoaded = true;

          this.scheduleService.findAllReceptumsForSchedule(item.$key, this.uid)
            .subscribe(receptums => {
              item.week.map(day => {
                day.receptums = [];
                return day;
              });

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

    this.paymentService.status()
      .subscribe(status => {
        this.status = status.$value;
      });

    this.paymentService.trial()
      .subscribe(trial => {
        this.trial = trial.$value;
      });
  }
}
