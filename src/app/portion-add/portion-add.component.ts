import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ReceptumsService} from '../shared/model/receptums.service';
import {ActivatedRoute} from '@angular/router';
import {TaskService} from '../shared/task/task.service';
import {MessagingService} from '../shared/messaging/messaging.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-portion-add',
  templateUrl: './portion-add.component.html',
  styleUrls: ['./portion-add.component.scss']
})
export class PortionAddComponent implements OnInit {
  scheduleKey: string;
  schedule: string;
  schedules = {
    Morn: 8,
    Noon: 14,
    Eve: 20,
    Bed: 23
  };

  constructor(private route: ActivatedRoute,
              private receptumsService: ReceptumsService,
              private activatedRoute: ActivatedRoute,
              private taskService: TaskService,
              private messagingService: MessagingService) { }

  ngOnInit() {
    this.scheduleKey = this.route.snapshot.params['key'];

    this.activatedRoute.parent.queryParams.subscribe((params: any) => {
      if (params) {
        this.schedule = params.schedule;

        // console.log(this.schedule);

        // console.log(this.schedules[this.schedule]);
      }
    });
  }

  save(form) {

    this.receptumsService
      .createNewReceptum(this.scheduleKey, form.value, this.schedule)
      .subscribe(
        (data) => {
          // console.log(data);
          // console.log(form.value);

          // // Start task now, then repeat every 5 mins
          this.taskService.performPeriodic(
            data.key,
            // Date.now(),
            form.value.timestamp
              ? new Date(new Date(form.value.timestamp).setHours(this.schedules[this.schedule])).getTime()
              : new Date(new Date(new Date().toISOString().substring(0, 10)).setHours(this.schedules[this.schedule])).getTime(),
            // minutes(1),
            minutes(form.value.recurrence ? form.value.recurrence * 1440 : 1440),
            'emailWorker',
            { hello: 'yes' }
          );

          alert('Medicine added');

          this.messagingService.getPermission();

          form.reset();
        },
        err => alert(`${err}`)
      );

  }
}

function minutes(v: number) {
  return v * 60 * 1000;
}
