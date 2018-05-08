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

    return this.db.object(`/users/${this.authInfo.$uid}/subscription/cancel_url`);
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

  trial() {
    return this.db.object(`/users/${this.authInfo.$uid}/subscription/trial`);
  }

  trialUpdate(status) {
    return this.db.object(`/users/${this.authInfo.$uid}/subscription`)
      .update({ trial: status });
  }
}
