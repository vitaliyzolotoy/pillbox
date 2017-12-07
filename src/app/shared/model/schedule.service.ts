import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AngularFireDatabase } from 'angularfire2/database';
import {ScheduleItem} from './scheduleItem';
import {Receptum} from './receptum';
import {AuthService} from '../security/auth.service';
import {AuthInfo} from '../security/auth-info';

@Injectable()
export class ScheduleService {
  authInfo: AuthInfo;

  constructor(private db: AngularFireDatabase,
              private authService: AuthService) {
    this.authService.authInfo$.subscribe(authInfo => {
      this.authInfo = authInfo;
    });
  }

  findAllScheduleItems(): Observable<ScheduleItem[]> {
    return this.db.list('schedule')
      // .do(console.log)
      .map(ScheduleItem.fromJsonList);
  }

  // findCalendarByKey(calendarKey: string): Observable<ScheduleItem> {
  //   return this.db.list('schedule', {
  //     query: {
  //       orderByKey: true,
  //       equalTo: calendarKey
  //     }
  //   }).map(results => results[0]);
  // }

  findReceptumsKeysPerScheduleKey(scheduleItemKey: string): Observable<Receptum[]> {
    return this.db.list(`receptumsPerSchedule/${this.authInfo.$uid}/${scheduleItemKey}`);
  }

  findAllReceptumsForSchedule(scheduleItemKey: string): Observable<Receptum[]> {
    const receptumsPerSchedule = this.findReceptumsKeysPerScheduleKey(scheduleItemKey);

    const scheduleReceptumss = receptumsPerSchedule
      .map(espc => espc.map(epc => this.db.object(`receptums/${this.authInfo.$uid}/${epc.$key}`)))
      .flatMap(fboj => Observable.combineLatest(fboj))
      // .do(console.log);

    // scheduleReceptumss.subscribe();

    return scheduleReceptumss;
  }
}
