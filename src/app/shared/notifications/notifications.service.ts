import { Injectable } from '@angular/core';
import {AuthInfo} from '../security/auth-info';
import {AngularFireDatabase} from 'angularfire2/database';
import {AuthService} from '../security/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  authInfo: AuthInfo;

  constructor(private db: AngularFireDatabase,
              private authService: AuthService) {
    this.authService.authInfo$.subscribe(authInfo => this.authInfo = authInfo);
  }

  savePhone(formData) {
    console.log(formData);

    this.db.object(`/users/${this.authInfo.$uid}`)
      .update({ smsNotifications: true });

    return this.db.object(`/users/${this.authInfo.$uid}`)
      .update({ phoneNumber: formData.phoneNumber });
  }

  turnOffSms() {
    return this.db.object(`/users/${this.authInfo.$uid}`)
      .update({ smsNotifications: false });
  }

  phoneNumber() {
    return this.db.object(`/users/${this.authInfo.$uid}/phoneNumber`).valueChanges();
  }

  smsStatus() {
    return this.db.object(`/users/${this.authInfo.$uid}/smsNotifications`).valueChanges();
  }
}
