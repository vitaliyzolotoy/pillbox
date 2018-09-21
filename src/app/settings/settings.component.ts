import { Component, OnInit } from '@angular/core';
import {PaymentService} from '../shared/payment/payment.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NotificationsService} from '../shared/notifications/notifications.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  phoneForm: FormGroup;
  status;
  notifications;
  partialNotifications;
  cancel;
  smsStatus;

  constructor(public paymentService: PaymentService,
              private formBuilder: FormBuilder,
              public notificationsService: NotificationsService) { }

  ngOnInit() {
    this.phoneForm = this.formBuilder.group({
      phoneNumber: ['', [
        Validators.required,
        Validators.pattern(/^\+?[1-9]\d{1,14}$/),
      ]]
    });

    this.paymentService.status()
      .subscribe(status => {
        this.status = status;
      });

    this.paymentService.notifications()
      .subscribe(notifications => {
        this.notifications = notifications;
      });

    this.paymentService.partialNotifications()
      .subscribe(notifications => {
        this.partialNotifications = notifications.some(item => {
          return item === true;
        });

        // console.log(this.partialNotifications);
      });

    this.paymentService.unsubscribe()
      .subscribe(cancel => {
        this.cancel = cancel;
        // console.log(cancel);
      });

    this.notificationsService.smsStatus()
      .subscribe(smsStatus => {
        this.smsStatus = smsStatus;
      });

    this.notificationsService.phoneNumber()
      .subscribe(phoneNumber => {
        this.phoneForm.patchValue({
          phoneNumber: phoneNumber
        });
      });
  }

  turnOffNotifications() {
    this.paymentService.turnOffNotifications();
  }

  isErrorVisible(field: string, error: string) {
    return this.phoneForm.controls[field].dirty
      && this.phoneForm.controls[field].errors
      && this.phoneForm.controls[field].errors[error];

  }

  savePhone(formData) {
    this.notificationsService.savePhone(formData);
  }

  turnOffSms() {
    // alert()
    this.notificationsService.turnOffSms();
  }
}
