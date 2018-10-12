import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../shared/security/auth.service';
import { Router } from '@angular/router';
import {PaymentService} from '../shared/payment/payment.service';
import {environment} from '../../environments/environment';
import {paddleConfig} from '../../environments/paddle.config';
import {AnalyticsService} from '../shared/analytics/analytics.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  timezones = {
    '-12': 'Etc/GMT+12',
    '-11': 'Etc/GMT+11',
    '-10': 'Etc/GMT+10',
    '-9': 'Etc/GMT+9',
    '-8': 'Etc/GMT+8',
    '-7': 'Etc/GMT+7',
    '-6': 'Etc/GMT+6',
    '-5': 'Etc/GMT+5',
    '-4': 'Etc/GMT+4',
    '-3': 'Etc/GMT+3',
    '-2': 'Etc/GMT+2',
    '-1': 'Etc/GMT+1',
    '-0': 'Etc/GMT0',
    '1': 'Etc/GMT-1',
    '2': 'Etc/GMT-2',
    '3': 'Etc/GMT-3',
    '4': 'Etc/GMT-4',
    '5': 'Etc/GMT-5',
    '6': 'Etc/GMT-6',
    '7': 'Etc/GMT-7',
    '8': 'Etc/GMT-8',
    '9': 'Etc/GMT-9',
    '10': 'Etc/GMT-10',
    '11': 'Etc/GMT-11',
    '12': 'Etc/GMT-12',
    '13': 'Etc/GMT-13',
    '14': 'Etc/GMT-14'
  };
  subscription = environment.subscription;
  id;
  token;
  loading = false;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              public paymentService: PaymentService,
              private analyticsService: AnalyticsService) {
    this.form = fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.pattern(/(?:\d+[a-z]|[a-z]+\d)[a-z\d]*/)
      ]],
      confirm: ['', Validators.required],
      terms: [false, Validators.required]
    });
  }

  ngOnInit() {
    this.configHandler();
  }

  isPasswordMatch() {
    const val = this.form.value;

    return val && val.password && val.password === val.confirm;
  }

  isAgreed() {
    const val = this.form.value;

    return val && val.terms === true;
  }

  isErrorVisible(field: string, error: string) {
    return this.form.controls[field].dirty
      && this.form.controls[field].errors
      && this.form.controls[field].errors[error];

  }

  signUp() {
    const formValue = this.form.value;

    this.loading = true;

    this.authService.signUp(formValue.email, formValue.password)
      .subscribe(
        () => {
          // console.log(environment.subscription, this.token, this.id);

          if (environment.subscription && this.id) {
            Paddle.Checkout.open({
              product: this.id,
              email: this.form.value.email,
              passthrough: paddleConfig.passthrough,
              locale: 'en',
              title: 'Pillbox',
              successCallback: data => {
                // console.log(data);
                this.token = data;
                this.paymentService.processPayment(data, this.id);

                gtag_report_conversion();
              }
            });

            // this.paymentService.trialUpdate(false);
          }

          this.paymentService.trialUpdate(true);

          this.paymentService.saveEmail();

          this.paymentService.saveTimezone(this.timezones[this.getTimezoneOffset()]);

          alert('Account creates successfully');

          this.router.navigate(['/home']);

          this.analyticsService.trackEvent('signup');
        },
        alert
      );
  }

  configHandler() {
    Paddle.Setup({
      vendor: paddleConfig.vendor
    });
  }

  onId(id) {
    // console.log(id);
    this.id = id;
  }

  getTimezoneOffset() {
    const offset = new Date().getTimezoneOffset();
    const timezone = offset / -60;

    // console.log(timezone);

    return timezone;
  }
}
