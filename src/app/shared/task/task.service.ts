import {Inject, Injectable} from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {AuthInfo} from '../security/auth-info';
import {AuthService} from '../security/auth.service';
import {FirebaseApp} from 'angularfire2';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  authInfo: AuthInfo;
  sdkDb;

  constructor(private db: AngularFireDatabase,
              private authService: AuthService,
              @Inject(FirebaseApp) fb: FirebaseApp) {
    this.authService.authInfo$.subscribe(authInfo => this.authInfo = authInfo);

    this.sdkDb = fb.database().ref();
  }

  // Schedule recurring tasks
  performPeriodic(id: string, time: number, interval: number, worker: string, opts = {}) {
    const newTaskKey = this.sdkDb.child(`tasks`).push().key;

    const taskRef = this.db.object(`tasks/${id}`);

    taskRef.set({ time, interval, worker, opts, uid: this.authInfo.$uid, key: newTaskKey });
  }

  deleteTask(id) {
    return this.db.object(`tasks/${id}`).remove();
  }
}
