import { Component, OnInit } from '@angular/core';
import {PaymentService} from '../shared/payment/payment.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  status;
  notifications;
  partialNotifications;
  cancel;

  constructor(public paymentService: PaymentService) { }

  ngOnInit() {
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
  }

  turnOffNotifications() {
    this.paymentService.turnOffNotifications();
  }
}
