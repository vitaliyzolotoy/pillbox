import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {AuthService} from '../security/auth.service';
import {AuthInfo} from '../security/auth-info';
import {HttpClient} from '@angular/common/http';
import {paddleConfig} from '../../../environments/paddle.config';
import {AnalyticsService} from '../analytics/analytics.service';

@Injectable()
export class PaymentService {
  authInfo: AuthInfo;

  constructor(private db: AngularFireDatabase,
              private authService: AuthService,
              private http: HttpClient,
              private analyticsService: AnalyticsService) {
    this.authService.authInfo$.subscribe(authInfo => this.authInfo = authInfo);
  }

  processPayment(data: any, plan: any) {
    this.analyticsService.trackEvent('subscription');

    const id = data.checkout.id;

    this.db.object(`/checkouts/${id}`)
      .update({ id: `${this.authInfo.$uid}` });

    return this.db.object(`/users/${this.authInfo.$uid}/subscription`)
      // .update({ token: data, plan: plan, status: 'active' });
      .update({ token: id, plan: plan, status: 'active' });
  }

  unsubscribe() {
    // this.db.object(`/users/${this.authInfo.$uid}/subscription`)
    //   .update({ status: 'canceled', canceled: true });

    return this.db.object(`/users/${this.authInfo.$uid}/subscription/cancel_url`).valueChanges();
      //
      // .subscribe(url => {
      //   console.log(url.$value);
      //   return this.http.post(url.$value, {}).subscribe(res => {
      //     console.log(res)
      //   });
      // });
  }

  update() {
    return this.db.object(`/users/${this.authInfo.$uid}/subscription/update_url`);
  }

  status() {
    return this.db.object(`/users/${this.authInfo.$uid}/subscription/status`).valueChanges();
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
    return this.db.object(`/users/${this.authInfo.$uid}/subscription/notifications`).valueChanges();
  }

  partialNotifications() {
    return this.db.list(`/users/${this.authInfo.$uid}/notifications`).valueChanges();
  }

  turnOffNotifications() {
    this.db.object(`/users/${this.authInfo.$uid}`)
      .update({ notifications: {
        'Morn': false,
        'Noon': false,
        'Eve': false,
        'Bed': false
      } });

    return this.db.object(`/users/${this.authInfo.$uid}/subscription`)
      .update({ notifications: false });
  }

  trial() {
    return this.db.object(`/users/${this.authInfo.$uid}/subscription/trial`).valueChanges();
  }

  trialUpdate(status) {
    return this.db.object(`/users/${this.authInfo.$uid}/subscription`)
      .update({ trial: status });
  }
}
