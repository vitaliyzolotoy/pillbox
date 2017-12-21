import {Injectable} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AngularFireDatabase } from 'angularfire2/database';
import {Subject} from 'rxjs/Subject';
import {AuthService} from '../security/auth.service';
import {AuthInfo} from '../security/auth-info';
import {Receptum} from './receptum';

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

  findAllReceptums(): Observable<Receptum[]> {
    return this.db.list(`receptums/${this.authInfo.$uid}`)
      .do(console.log)
      .map(Receptum.fromJsonList);
  }

  createNewReceptum(scheduleKey: string, receptum: any): Observable<any> {
    const receptumToSave = Object.assign({}, receptum, {scheduleItemId: scheduleKey});

    const newReceptumKey = this.sdkDb.child('events').push().key;

    const dataToSave = {};

    dataToSave[`receptums/${this.authInfo.$uid}/${newReceptumKey}`] = receptumToSave;
    dataToSave[`receptumsPerSchedule/${this.authInfo.$uid}/${scheduleKey}/${newReceptumKey}`] = true;

    return this.firebaseUpdate(dataToSave);
  }

  removeReceptum(key, scheduleItemId) {
    this.db.object(`receptums/${this.authInfo.$uid}/${key}`).remove();
    this.db.object(`receptumsPerSchedule/${this.authInfo.$uid}/${scheduleItemId}/${key}`).remove();
  }

  firebaseUpdate(dataToSave) {
    const subject = new Subject();

    this.sdkDb.update(dataToSave)
      .then(
        val => {
          subject.next(val);
          subject.complete();
        },
        err => {
          subject.error(err);
          subject.complete();
        }
      );

    return subject.asObservable();
  }
}
