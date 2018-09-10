import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {BehaviorSubject} from 'rxjs';
import {AuthInfo} from '../security/auth-info';
import {AuthService} from '../security/auth.service';
import {AngularFireDatabase} from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class MessagingService {
  authInfo: AuthInfo;
  currentMessage = new BehaviorSubject(null);
  messaging = null;

  constructor(private authService: AuthService,
              private db: AngularFireDatabase) {
    this.authService.authInfo$.subscribe(authInfo => this.authInfo = authInfo);

    if (firebase.messaging.isSupported()) {
      this.messaging = firebase.messaging();

      // alert()
    }
  }

  updateToken(token) {
    return this.db.object(`/users/${this.authInfo.$uid}/fcmToken`)
      .update({ token: token });
  }

  getPermission() {
    this.messaging.requestPermission()
      .then(() => {
        console.log('Notification permission granted.');
        return this.messaging.getToken();
      })
      .then(token => {
        console.log(token);
        this.updateToken(token);
      })
      .catch((err) => {
        console.log('Unable to get permission to notify.', err);
      });
  }

  receiveMessage() {
    this.messaging.onMessage((payload) => {
      console.log('Message received. ', payload);
      this.currentMessage.next(payload);
    }, (err) => {
      console.log('Messaging in not supported. ', err);
    });
  }
}
