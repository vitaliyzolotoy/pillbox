import { Component, OnInit } from '@angular/core';
import {PaymentService} from '../shared/payment/payment.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  status;

  constructor(public paymentService: PaymentService) { }

  ngOnInit() {
    this.paymentService.status()
      .subscribe(status => {
        this.status = status.$value;
      });
  }

  unsubscribe() {
    this.paymentService.unsubscribe();
  }
}
