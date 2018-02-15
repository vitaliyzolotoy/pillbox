import {Component, OnInit} from '@angular/core';
import { AuthService } from '../shared/security/auth.service';
import {AuthInfo} from '../shared/security/auth-info';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  authInfo: AuthInfo;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.authInfo$.subscribe(authInfo => {
      this.authInfo = authInfo;
    });
  }
}
