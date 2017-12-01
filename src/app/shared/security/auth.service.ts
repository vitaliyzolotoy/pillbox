import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthInfo } from './auth-info';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  static UNKNOWN_USER = new AuthInfo(null);

  authInfo$: BehaviorSubject<AuthInfo> = new BehaviorSubject<AuthInfo>(AuthService.UNKNOWN_USER);

  constructor(private auth: AngularFireAuth,
              private router: Router) {
    auth.authState.subscribe((authState) => {
      if (authState) {
        const authInfo = new AuthInfo(authState.uid);
        this.authInfo$.next(authInfo);
      }
    });
  }

  login(email, password): Observable<AngularFireAuth> {
    return this.fromFirebaseAuthPromise(this.auth.auth.signInWithEmailAndPassword(email, password));
  }

  signUp(email, password): Observable<AngularFireAuth> {
    return this.fromFirebaseAuthPromise(this.auth.auth.createUserWithEmailAndPassword(email, password));
  }

  fromFirebaseAuthPromise(promise): Observable<any> {
    const subject = new Subject<any>();

    promise
      .then(res => {
        const authInfo = new AuthInfo(this.auth.auth.currentUser.uid);

        this.authInfo$.next(authInfo);
        subject.next(res);
        subject.complete();
      },
    err => {
      this.authInfo$.error(err);
      subject.error(err);
      subject.complete();
    })

    return subject.asObservable();
  }

  logout() {
    this.auth.auth.signOut();
    this.authInfo$.next(AuthService.UNKNOWN_USER);
    this.router.navigate(['/login']);
  }
}
