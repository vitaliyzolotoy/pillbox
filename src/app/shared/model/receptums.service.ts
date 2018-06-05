import {Inject, Injectable} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AngularFireDatabase } from 'angularfire2/database';
import {Subject} from 'rxjs/Subject';
import {AuthService} from '../security/auth.service';
import {AuthInfo} from '../security/auth-info';
import {Receptum} from './receptum';
import {FirebaseApp} from 'angularfire2';
import {map} from 'rxjs/operators';

@Injectable()
export class ReceptumsService {
  sdkDb;
  authInfo: AuthInfo;

  constructor(private db: AngularFireDatabase,
              private authService: AuthService,
              @Inject(FirebaseApp) fb: FirebaseApp) {
    this.sdkDb = fb.database().ref();

    this.authService.authInfo$.subscribe(authInfo => {
      this.authInfo = authInfo;
    });
  }

  findAllReceptums(): Observable<any> {
    return this.db.list<Receptum>(`receptums/${this.authInfo.$uid}`).snapshotChanges().pipe(
      map(actions => {
        console.log(actions);
          // Receptum.fromJsonList
      })
    );
  }

  createNewReceptum(scheduleKey: string, receptum: any, schedule: string): Observable<any> {
    const receptumToSave = Object.assign({}, receptum, {scheduleItemId: scheduleKey});

    const newReceptumKey = this.sdkDb.child('receptums').push().key;

    const dataToSave = {};

    dataToSave[`receptums/${this.authInfo.$uid}/${newReceptumKey}`] = receptumToSave;
    dataToSave[`receptumsPerSchedule/${this.authInfo.$uid}/${scheduleKey}/${newReceptumKey}`] = true;
    // dataToSave[`users/${this.authInfo.$uid}/subscription/notifications`] = true;
    dataToSave[`users/${this.authInfo.$uid}/notifications/${schedule}`] = true;

    // console.log(dataToSave);

    return this.firebaseUpdate(dataToSave);
  }

  removeReceptum(key, scheduleItemId) {
    // console.log(key);
    this.db.object(`receptums/${this.authInfo.$uid}/${key}`).remove();
    this.db.object(`receptumsPerSchedule/${this.authInfo.$uid}/${scheduleItemId}/${key}`).remove();

    const schedule = this.db.object(`schedule/${scheduleItemId}/name`).valueChanges();

    schedule.subscribe(current => {
      this.db.object(`receptumsPerSchedule/${this.authInfo.$uid}/${scheduleItemId}`).valueChanges()
        .subscribe(receptums => {
          // console.log(receptums);

          if (!receptums) {
            const dataToSave = {};

            dataToSave[`users/${this.authInfo.$uid}/notifications/${current}`] = false;

            return this.firebaseUpdate(dataToSave);
          }
        });
    });
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
