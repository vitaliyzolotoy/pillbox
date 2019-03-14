import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../shared/security/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AnalyticsService} from '../shared/analytics/analytics.service';
import {NotifyComponent} from '../notify/notify.component';
import {AlertService} from '../shared/alert/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;

  @ViewChild('alert', { read: ViewContainerRef }) alert: ViewContainerRef;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private analyticsService: AnalyticsService,
              private activatedRoute: ActivatedRoute,
              private cfr: ComponentFactoryResolver,
              private alertService: AlertService) {
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

    this.loading = true;

    this.authService.login(formValue.email, formValue.password)
      .subscribe(
        () => {
          this.router.navigate(['/home']);

          if (formValue.email === 'demo@getpillboxapp.com') {
            this.analyticsService.trackEvent('demo');
          } else {
            this.analyticsService.trackEvent('login');
          }
        },
        (error) => {
          this.showAlert('alert');

          this.alertService.error(error);
        }
      );
  }

  isErrorVisible(field: string, error: string) {
    return this.form.controls[field].dirty
      && this.form.controls[field].errors
      && this.form.controls[field].errors[error];

  }

  showAlert(target) {
    this[target].clear();

    const factory = this.cfr.resolveComponentFactory(NotifyComponent);

    const ref = this[target].createComponent(factory);

    ref.changeDetectorRef.detectChanges();
  }
}
