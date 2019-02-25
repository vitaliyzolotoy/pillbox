import {Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ScheduleItem} from '../shared/model/scheduleItem';
import {ScheduleService} from '../shared/model/schedule.service';
import {Receptum} from '../shared/model/receptum';
import {PaymentService} from '../shared/payment/payment.service';
import {ActivatedRoute} from '@angular/router';
require('moment-recur');

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
  loading = false;
  status;
  trial;
  days;
  start;
  week;
  current;
  dayOfWeek;
  @ViewChild('scroller', {read: ElementRef}) private scroller: ElementRef;

  constructor(private scheduleService: ScheduleService,
              public paymentService: PaymentService,
              @Inject('moment') private moment,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.start = this.moment().clone().startOf('isoWeek');

    this.activatedRoute.parent.queryParams.subscribe((params: any) => {
      if (params) {
        this.week = params.week;

        this.getCurrentWeek(this.week);

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

              this.loading = true;

              // console.log(new Date().getDay())

              this.dayOfWeek = new Date().getDay() || 7;


              this.scroller.nativeElement.scrollLeft = 1190 / 7 * (this.dayOfWeek - 1);

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
      }
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

  getCurrentWeek(week?) {
    // console.log(week)
    if (week) {
      this.start = this.start.add(1, 'weeks');
    } else {
      this.start = this.moment().startOf('isoWeek');
    }

    const days = [];

    for (let i = 0; i <= 6; i++) {
      days.push(this.moment(this.start).add(i, 'days').format('MM/DD/YYYY'));
    }

    // console.log(days);

    this.days = days;
  }

  // onActive(current) {
  //   console.log(current.name.toLowerCase());
  //
  //   this.current = current.name.toLowerCase();
  // }
}
