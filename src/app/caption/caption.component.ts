import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from '../shared/security/auth.service';
import {AuthInfo} from '../shared/security/auth-info';

@Component({
  selector: 'app-caption',
  templateUrl: './caption.component.html',
  styleUrls: ['./caption.component.scss']
})
export class CaptionComponent implements OnInit {
  @Input() period;
  @Input() day;

  authInfo: AuthInfo;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.authInfo$.subscribe(authInfo => {
      this.authInfo = authInfo;
    });
  }

}
