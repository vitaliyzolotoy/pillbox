import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {ScheduleItem} from './scheduleItem';
import {map} from 'rxjs/operators';

@Injectable()
export class ScheduleService {
  constructor(private db: AngularFireDatabase) {}

  findAllScheduleItems(): Observable<ScheduleItem[]> {
    return this.db.list<AngularFireList<any>>('schedule').snapshotChanges().pipe(
      map(actions => {
        return ScheduleItem.fromJsonList(actions.map(c => ({ $key: c.payload.key, ...c.payload.val() })));
      })
    );
  }

  // findCalendarByKey(calendarKey: string): Observable<ScheduleItem> {
  //   return this.db.list('schedule', {
  //     query: {
  //       orderByKey: true,
  //       equalTo: calendarKey
  //     }
  //   }).map(results => results[0]);
  // }

  findReceptumsKeysPerScheduleKey(scheduleItemKey: string, uid: string): Observable<any> {
    return this.db.list(`receptumsPerSchedule/${uid}/${scheduleItemKey}`).snapshotChanges().pipe(
      map(actions => {
        actions.map(c => ({ $key: c.payload.key, ...c.payload.val() }));
        // console.log(actions);
        return actions;
      })
    );
  }

  findAllReceptumsForSchedule(scheduleItemKey: string, uid: string): Observable<any> {
    // console.log(uid);
    const receptumsPerSchedule = this.findReceptumsKeysPerScheduleKey(scheduleItemKey, uid);

    const scheduleReceptums = receptumsPerSchedule
      .map(rsps => rsps.map(rps => this.db.object(`receptums/${uid}/${rps.key}`).snapshotChanges().pipe(
        map(action => {
          return { key: action.payload.key, ...action.payload.val() };
        })
      )))
      .flatMap(fboj => Observable.combineLatest(fboj));
    // .do(console.log);

    // scheduleReceptums.subscribe();

    return scheduleReceptums;
  }
}
