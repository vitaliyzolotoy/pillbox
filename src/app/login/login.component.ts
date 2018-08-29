import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../shared/security/auth.service';
import {Router} from '@angular/router';
import {AnalyticsService} from '../shared/analytics/analytics.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private analyticsService: AnalyticsService) {
    this.form = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.analyticsService.trackPageViews();
  }

  ngOnInit() {
  }

  login() {
    const formValue = this.form.value;

    this.authService.login(formValue.email, formValue.password)
      .subscribe(
        () => {
          this.router.navigate(['/home']);

          this.analyticsService.trackEvent('login');
        },
        alert
      );
  }
}
