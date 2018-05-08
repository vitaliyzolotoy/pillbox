import { Component, OnInit } from '@angular/core';
import {paddleConfig} from '../../environments/paddle.config';
import {PaymentService} from '../shared/payment/payment.service';
import {AuthService} from '../shared/security/auth.service';
import {AuthInfo} from '../shared/security/auth-info';

@Component({
  selector: 'app-upgrade',
  templateUrl: './upgrade.component.html',
  styleUrls: ['./upgrade.component.scss']
})
export class UpgradeComponent implements OnInit {
  id;
  token;
  authInfo: AuthInfo;

  constructor(public paymentService: PaymentService,
              private authService: AuthService) { }

  ngOnInit() {
    this.authService.authInfo$.subscribe(authInfo => {
      // console.log(authInfo);

      this.authInfo = authInfo;
    });

    this.configHandler();
  }

  configHandler() {
    Paddle.Setup({
      vendor: paddleConfig.vendor
    });
  }

  onId(id) {
    // console.log(id);
    this.id = id;

    Paddle.Checkout.open({
      product: id,
      email: this.authInfo.email,
      passthrough: paddleConfig.passthrough,
      locale: 'en',
      title: 'Pillbox',
      successCallback: data => {
        // console.log(data);
        this.token = data;
        this.paymentService.processPayment(this.token, this.id);
        // this.paymentService.trialUpdate(false);
      }
    });
  }
}
