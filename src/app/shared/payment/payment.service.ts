import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth';
import {AuthService} from '../security/auth.service';
import {AuthInfo} from '../security/auth-info';

@Injectable()
export class PaymentService {
  authInfo: AuthInfo;

  constructor(private db: AngularFireDatabase, private authService: AuthService) {
    this.authService.authInfo$.subscribe(authInfo => this.authInfo = authInfo);
  }

  processPayment(token: any, plan: any) {
    return this.db.object(`/users/${this.authInfo.$uid}/subscription`)
      .update({ token: token.id, plan: plan });
  }

  unsubscribe() {
    return this.db.object(`/users/${this.authInfo.$uid}/subscription`)
      .update({ status: 'canceled', canceled: true });
  }

  status() {
    return this.db.object(`/users/${this.authInfo.$uid}/subscription/status`);
  }

  saveEmail() {
    return this.db.object(`/users/${this.authInfo.$uid}/subscription`)
      .update({ email: this.authInfo.email });
  }
}
