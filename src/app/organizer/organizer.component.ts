import {Component, Inject, Input, OnInit} from '@angular/core';
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
  days;

  constructor(private scheduleService: ScheduleService,
              public paymentService: PaymentService,
              @Inject('moment') private moment) { }

  ngOnInit() {
    this.getCurrentWeek();

    this.scheduleService.findAllScheduleItems()
    // .do(console.log)
      .subscribe(schedule => {
        schedule.map(item => {
          item.week = [
            {
              name: 'Mon',
              receptums: [],
              // date: new Date('06/18/2018')
            },
            {
              name: 'Tue',
              receptums: [],
              // date: new Date('06/19/2018')
            },
            {
              name: 'Wed',
              receptums: [],
              // date: new Date('06/20/2018')
            },
            {
              name: 'Thu',
              receptums: [],
              // date: new Date('06/21/2018')
            },
            {
              name: 'Fri',
              receptums: [],
              // date: new Date('06/22/2018')
            },
            {
              name: 'Sat',
              receptums: [],
              // date: new Date('06/23/2018')
            },
            {
              name: 'Sun',
              receptums: [],
              // date: new Date('06/24/2018')
            }
          ];

          item.week.map((day, index) => {
            day.date = this.days[index];

            // console.log(day, index);

            return day;
          });

          this.isLoaded = true;

          // console.log(item);

          this.scheduleService.findAllReceptumsForSchedule(item.$key, this.uid)
            .subscribe(receptums => {
              item.week.map(day => {
                day.receptums = [];
                return day;
              });

              // console.log(receptums);

              receptums.map(receptum => {
                if (receptum.repeat) {
                  item.week.map(day => {
                    return day.receptums.push(receptum);
                  });
                } else {
                  if (receptum.recurrence && receptum.timestamp) {
                    const rInterval = this.moment(new Date(receptum.timestamp)).recur().every(receptum.recurrence).days();

                    item.week.map(day => {
                      if (rInterval.matches(day.date)) {
                        return day.receptums.push(receptum);
                      }
                    });
                  } else {
                    item.week.map(day => {
                      if (day.name === receptum.day) {
                        return day.receptums.push(receptum);
                      }
                    });
                  }
                }
              });
            });
        });
        this.schedule = schedule;
      });

    this.paymentService.status()
      .subscribe(status => {
        this.status = status;
      });

    this.paymentService.trial()
      .subscribe(trial => {
        this.trial = trial;
      });
  }

  getCurrentWeek() {
    const currentDate = this.moment();

    const weekStart = currentDate.clone().startOf('isoWeek');
    // const weekEnd = currentDate.clone().endOf('isoWeek');

    const days = [];

    for (let i = 0; i <= 6; i++) {
      days.push(this.moment(weekStart).add(i, 'days').format('MM/DD/YYYY'));
    }

    // console.log(days);

    this.days = days;
  }
}
