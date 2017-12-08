import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AngularFireDatabase } from 'angularfire2/database';
import {ScheduleItem} from './scheduleItem';
import {Receptum} from './receptum';

@Injectable()
export class ScheduleService {
  constructor(private db: AngularFireDatabase) {}

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

  findReceptumsKeysPerScheduleKey(scheduleItemKey: string, uid: string): Observable<Receptum[]> {
    return this.db.list(`receptumsPerSchedule/${uid}/${scheduleItemKey}`);
  }

  findAllReceptumsForSchedule(scheduleItemKey: string, uid: string): Observable<Receptum[]> {
    console.log(uid);
    const receptumsPerSchedule = this.findReceptumsKeysPerScheduleKey(scheduleItemKey, uid);

    const scheduleReceptums = receptumsPerSchedule
      .map(espc => espc.map(epc => this.db.object(`receptums/${uid}/${epc.$key}`)))
      .flatMap(fboj => Observable.combineLatest(fboj));
      // .do(console.log);

    // scheduleReceptums.subscribe();

    return scheduleReceptums;
  }
}
