import {Injectable} from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { AngularFireDatabase } from 'angularfire2/database';
// import { Event } from './event';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class EventsService {
  sdkDb;

  constructor(private db: AngularFireDatabase) {
    this.sdkDb = db.database.ref();
  }

  // findAllEvents(): Observable<Event[]> {
  //   return this.db.list('events')
  //     .do(console.log)
  //     .map(Event.fromJsonList);
  // }

  createNewEvent(calendarKey: string, event: any): Observable<any> {
    const eventToSave = Object.assign({}, event, {calendarId: calendarKey});

    const newEventKey = this.sdkDb.child('events').push().key;

    const dataToSave = {};

    dataToSave[`events/${newEventKey}`] = eventToSave;
    dataToSave[`eventsPerCalendar/${calendarKey}/${newEventKey}`] = true;

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
