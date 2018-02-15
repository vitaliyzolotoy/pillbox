import {Component, OnInit} from '@angular/core';
import { AuthService } from '../shared/security/auth.service';
import {AuthInfo} from '../shared/security/auth-info';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  authInfo: AuthInfo;
  visibility = false;

  constructor(private authService: AuthService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.authService.authInfo$.subscribe(authInfo => {
      this.authInfo = authInfo;
    });

    this.activatedRoute.parent.queryParams.subscribe((params: any) => {
      if (params) {
        this.visibility = params.modal;
      }
    });
  }
}
