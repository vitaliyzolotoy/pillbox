import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService,
              private router: Router,
              private auth: AngularFireAuth) {}

  canActivate(): Observable<boolean> {
    return this.auth.authState.map((auth) => {
        if (!auth) {
          this.router.navigate(['login']);
          return false;
        }
        return true;
    }).take(1);

    // return this.authService.authInfo$
    //   .map(authInfo => authInfo.isLoggenIn())
    //   .take(1)
    //   .do(allowed => {
    //     if (!allowed) {
    //       this.router.navigate(['login'])
    //     }
    //   });
  }
}
