import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {AuthService} from '../security/auth.service';
import {AuthInfo} from '../security/auth-info';
import {HttpClient} from '@angular/common/http';
import {paddleConfig} from '../../../environments/paddle.config';

@Injectable()
export class PaymentService {
  authInfo: AuthInfo;

  constructor(private db: AngularFireDatabase,
              private authService: AuthService,
              private http: HttpClient) {
    this.authService.authInfo$.subscribe(authInfo => this.authInfo = authInfo);
  }

  processPayment(data: any, plan: any) {
    return this.db.object(`/users/${this.authInfo.$uid}/subscription`)
      .update({ token: data.checkout.id, plan: plan, status: 'active' });
  }

  unsubscribe() {
    this.db.object(`/users/${this.authInfo.$uid}/subscription`)
      .update({ status: 'canceled', canceled: true });

    this.db.object(`/users/${this.authInfo.$uid}/subscription/token`)
      .subscribe(token => {
        console.log(token);
        this.http.post(paddleConfig.unsubscribe_url, {
          vendor_id: paddleConfig.vendor,
          vendor_auth_code: paddleConfig.vendor_auth_code,
          subscription_id: token.$value
        }).subscribe(res => {
          console.log(res)
        });
      });
  }

  status() {
    return this.db.object(`/users/${this.authInfo.$uid}/subscription/status`);
  }

  saveEmail() {
    return this.db.object(`/users/${this.authInfo.$uid}/subscription`)
      .update({ email: this.authInfo.email });
  }

  saveTimezone(timezone: string) {
    return this.db.object(`/users/${this.authInfo.$uid}`)
      .update({ timezone: timezone });
  }

  notifications() {
    return this.db.object(`/users/${this.authInfo.$uid}/subscription/notifications`);
  }

  turnOffNotifications() {
    return this.db.object(`/users/${this.authInfo.$uid}/subscription`)
      .update({ notifications: false });
  }
}
