import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../shared/security/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
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
              private analyticsService: AnalyticsService,
              private activatedRoute: ActivatedRoute) {
    this.form = fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      password: ['', Validators.required]
    });

    this.analyticsService.trackPageViews();
  }

  ngOnInit() {
    this.activatedRoute.parent.queryParams.subscribe((params: any) => {
      if (params) {
        this.form.patchValue({
          email: params.email,
          password: params.password
        });
      }
    });
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

  isErrorVisible(field: string, error: string) {
    return this.form.controls[field].dirty
      && this.form.controls[field].errors
      && this.form.controls[field].errors[error];

  }
}
