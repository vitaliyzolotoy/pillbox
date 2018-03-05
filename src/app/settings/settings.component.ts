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
  cancel;

  constructor(public paymentService: PaymentService) { }

  ngOnInit() {
    this.paymentService.status()
      .subscribe(status => {
        this.status = status.$value;
      });

    this.paymentService.notifications()
      .subscribe(notifications => {
        this.notifications = notifications.$value;
      });

    this.paymentService.unsubscribe()
      .subscribe(data => {
        this.cancel = data.$value;
        // console.log(data);
      });
  }

  turnOffNotifications() {
    this.paymentService.turnOffNotifications();
  }
}
