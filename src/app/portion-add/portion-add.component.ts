import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ReceptumsService} from '../shared/model/receptums.service';
import {ActivatedRoute, Router} from '@angular/router';
import {TaskService} from '../shared/task/task.service';
import {MessagingService} from '../shared/messaging/messaging.service';
import * as firebase from 'firebase';
import {NotifyComponent} from '../notify/notify.component';
import {AlertService} from '../shared/alert/alert.service';
import {AnalyticsService} from '../shared/analytics/analytics.service';

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
  date;

  @ViewChild('alert', { read: ViewContainerRef }) alert: ViewContainerRef;

  constructor(private route: ActivatedRoute,
              private receptumsService: ReceptumsService,
              private activatedRoute: ActivatedRoute,
              private taskService: TaskService,
              private messagingService: MessagingService,
              private cfr: ComponentFactoryResolver,
              private alertService: AlertService,
              private analyticsService: AnalyticsService,
              private router: Router) { }

  ngOnInit() {
    this.scheduleKey = this.route.snapshot.params['key'];

    this.activatedRoute.parent.queryParams.subscribe((params: any) => {
      if (params) {
        this.schedule = params.schedule;

        this.date = params.date;

        // console.log(this.schedule);

        // console.log(this.schedules[this.schedule]);
      }
    });
  }

  save(form) {
    // console.log(form.value);

    // console.log(form.value.time.split(':')[0])

    this.receptumsService
      .createNewReceptum(form.value.schedule, form.value, this.schedule)
      .subscribe(
        (data) => {
          // console.log(data);
          // console.log(form.value);

          // // Start task now, then repeat every 5 mins
          this.taskService.performPeriodic(
            data.key,
            // Date.now(),
            form.value.timestamp
              ? new Date(new Date(new Date(form.value.timestamp).toISOString().substring(0, 10)).setHours(form.value.time.split(':')[0], form.value.time.split(':')[1])).getTime()
              : new Date(new Date(new Date().toISOString().substring(0, 10)).setHours(form.value.time.split(':')[0], form.value.time.split(':')[1])).getTime(),
            // minutes(1),
            minutes(form.value.recurrence ? form.value.recurrence * 1440 : 1440),
            'emailWorker',
            {
              quantity: form.value.quantity,
              type: form.value.type,
              name: form.value.name,
              dose: form.value.dose,
              unit: form.value.unit
            }
          );

          this.showAlert('alert');

          this.alertService.success('Medicine added');

          form.reset();

          this.analyticsService.trackEvent('create');

          // this.router.navigate(['/home'], { queryParams: { recupthum: 'added' } });

          this.messagingService.getPermission();
        },
        err => alert(`${err}`)
      );

  }

  showAlert(target) {
    this[target].clear();

    const factory = this.cfr.resolveComponentFactory(NotifyComponent);

    const ref = this[target].createComponent(factory);

    ref.changeDetectorRef.detectChanges();
  }
}

function minutes(v: number) {
  return v * 60 * 1000;
}
