import {Injectable} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AngularFireDatabase } from 'angularfire2/database';
// import { Event } from './event';
import {Subject} from 'rxjs/Subject';
import {AuthService} from '../security/auth.service';
import {AuthInfo} from '../security/auth-info';

@Injectable()
export class ReceptumsService {
  sdkDb;
  authInfo: AuthInfo;

  constructor(private db: AngularFireDatabase,
              private authService: AuthService) {
    this.sdkDb = db.database.ref();

    this.authService.authInfo$.subscribe(authInfo => {
      this.authInfo = authInfo;
    });
  }

  // findAllEvents(): Observable<Event[]> {
  //   return this.db.list('events')
  //     .do(console.log)
  //     .map(Event.fromJsonList);
  // }

  createNewReceptum(scheduleKey: string, receptum: any): Observable<any> {
    const eventToSave = Object.assign({}, receptum, {scheduleItemId: scheduleKey});

    const newReceptumKey = this.sdkDb.child('events').push().key;

    const dataToSave = {};

    dataToSave[`receptums/${this.authInfo.$uid}/${newReceptumKey}`] = eventToSave;
    dataToSave[`receptumsPerSchedule/${this.authInfo.$uid}/${scheduleKey}/${newReceptumKey}`] = true;

    return this.firebaseUpdate(dataToSave);
  }

  firebaseUpdate(dataToSave) {
    const subject = new Subject();

    this.sdkDb.update(dataToSave)
      .then(
        val => {
          subject.next(val);
          subject.complete()
        },
        err => {
          subject.error(err);
          subject.complete()
        }
      );

    return subject.asObservable();
  }
}
