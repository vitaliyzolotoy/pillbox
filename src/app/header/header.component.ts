import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../shared/security/auth.service';
import {AuthInfo} from '../shared/security/auth-info';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() visibility;
  authInfo: AuthInfo;
  week = 0;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.authInfo$.subscribe(authInfo => {
      this.authInfo = authInfo;
    });
  }

  onToday() {
    this.week = 0;
  }

  onNextWeek() {
    this.week = this.week + 1;
  }

  logout() {
    this.authService.logout();
  }
}
