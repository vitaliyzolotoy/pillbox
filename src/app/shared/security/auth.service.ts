import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs/Rx';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthInfo } from './auth-info';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  static UNKNOWN_USER = new AuthInfo(null, null, null);

  authInfo$: BehaviorSubject<AuthInfo> = new BehaviorSubject<AuthInfo>(AuthService.UNKNOWN_USER);

  constructor(private auth: AngularFireAuth,
              private router: Router) {
    auth.authState.subscribe((authState) => {
      if (authState) {
        console.log(authState)
        const authInfo = new AuthInfo(authState.uid, authState.email, authState.emailVerified);
        this.authInfo$.next(authInfo);
      }
    });

    // auth.auth.onIdTokenChanged((user) => {
    //   console.log('data from stateChanged: ', user);
    // })
  }

  login(email, password): Observable<AngularFireAuth> {
    return this.fromFirebaseAuthPromise(this.auth.auth.signInWithEmailAndPassword(email, password));
  }

  signUp(email, password): Observable<AngularFireAuth> {
    return this.fromFirebaseAuthPromise(this.auth.auth.createUserWithEmailAndPassword(email, password));
  }

  requestPass(email) {
    return this.auth.auth.sendPasswordResetEmail(email);
  }

  verifyEmail() {
    this.auth.auth.currentUser.sendEmailVerification();
  }

  fromFirebaseAuthPromise(promise): Observable<any> {
    const subject = new Subject<any>();

    promise
      .then(res => {
        // console.log(this.auth.auth.currentUser)
        const authInfo = new AuthInfo(this.auth.auth.currentUser.uid, this.auth.auth.currentUser.email, this.auth.auth.currentUser.emailVerified);

        this.authInfo$.next(authInfo);
        subject.next(res);
        subject.complete();
      },
    err => {
      this.authInfo$.error(err);
      subject.error(err);
      subject.complete();
    });

    return subject.asObservable();
  }

  logout() {
    this.auth.auth.signOut();
    this.authInfo$.next(AuthService.UNKNOWN_USER);
    this.router.navigate(['/login']);
  }
}
