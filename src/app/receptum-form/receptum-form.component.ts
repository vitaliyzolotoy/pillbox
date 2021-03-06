import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ScheduleService} from '../shared/model/schedule.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-receptum-form',
  templateUrl: './receptum-form.component.html',
  styleUrls: ['./receptum-form.component.scss']
})
export class ReceptumFormComponent implements OnInit {
  form: FormGroup;
  showOptions = false;
  schedule;
  scheduleKey;
  date;
  currentDate = Date.now();

  constructor(private formBuilder: FormBuilder,
              private scheduleService: ScheduleService,
              private route: ActivatedRoute,
              private activatedRoute: ActivatedRoute,
              @Inject('moment') private moment) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      schedule: ['-L0dRv-aGoYeniq-vtiZ', Validators.required],
      time: [null, [
        Validators.required,
        Validators.pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
      ]],
      quantity: [null, Validators.required],
      type: ['Tablet(s)', Validators.required],
      name: ['', Validators.required],
      dose: [null],
      unit: ['Milligram(s)'],
      repeat: [true],
      recurrence: [null],
      timestamp: [null]
    });

    this.scheduleService.findAllScheduleItems()
    // .do(console.log)
      .subscribe(schedule => {
      this.schedule = schedule;

        this.scheduleKey = this.route.snapshot.params['key'];

        this.form.controls['schedule'].patchValue(this.scheduleKey);
    });

    this.activatedRoute.parent.queryParams.subscribe((params: any) => {
      if (params.date) {
        this.date = params.date;

        this.form.controls['repeat'].patchValue(false);

        this.form.controls['recurrence'].patchValue(1);

        if (new Date(this.date) <= new Date(this.currentDate)) {
          this.form.controls['timestamp'].patchValue(new Date().toISOString().substring(0, 10));
        } else {
          console.log(this.moment(this.date).add(1, 'days').toDate());

          this.form.controls['timestamp'].setValue(this.moment(this.date).add(1, 'days').toDate().toISOString().substring(0, 10));
        }

        this.showOptions = true;
      }
    });

    this.form.valueChanges
      .subscribe(form => {
        if (form.repeat) {
          this.form.controls['timestamp'].reset();
        }
      });
  }

  isErrorVisible(field: string, error: string) {
    return this.form.controls[field].dirty
      && this.form.controls[field].errors
      && this.form.controls[field].errors[error];

  }

  reset() {
    this.form.reset();
  }

  get valid() {
    return this.form.valid;
  }

  get value() {
    return this.form.value;
  }

  showOptionsHandle() {
    this.showOptions = !this.showOptions;
  }

  getToday(): string {
    return new Date().toISOString().split('T')[0];
  }
}
