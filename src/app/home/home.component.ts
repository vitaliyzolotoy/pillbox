import {Component, ComponentFactoryResolver, Inject, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import { AuthService } from '../shared/security/auth.service';
import {AuthInfo} from '../shared/security/auth-info';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {PaymentService} from '../shared/payment/payment.service';
import {AnalyticsService} from '../shared/analytics/analytics.service';
import {MessagingService} from '../shared/messaging/messaging.service';
import {NotifyComponent} from '../notify/notify.component';
import {AlertService} from '../shared/alert/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  authInfo: AuthInfo;
  trial;
  status;
  message;
  month;

  @ViewChild('alert', { read: ViewContainerRef }) alert: ViewContainerRef;

  constructor(private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              public paymentService: PaymentService,
              private router: Router,
              private analyticsService: AnalyticsService,
              private messagingService: MessagingService,
              private cfr: ComponentFactoryResolver,
              private alertService: AlertService,
              @Inject('moment') private moment) {
    this.analyticsService.trackPageViews();
  }

  ngOnInit() {
    this.month = this.moment().clone().startOf('isoWeek').format('MMMM YYYY');

    this.authService.authInfo$.subscribe(authInfo => {
      console.log(authInfo);

      this.authInfo = authInfo;

      // if (!this.authInfo.verify) {
      //   this.showAlert('alert');
      //
      //   this.alertService.error('Please verify your email');
      // }
    });

    this.paymentService.trial()
      .subscribe(trial => {
        // console.log(trial)
        this.trial = trial;

        // console.log(!this.trial)

        this.paymentService.status()
          .subscribe(status => {
            this.status = status;

            if (!this.trial && this.status !== 'active') {
              this.router.navigate(['/home/upgrade'], { queryParams: { modal: true } });
            } else {
              this.router.navigate(['/home']);
            }

            if (this.status === 'canceled') {
              this.router.navigate(['/home/settings'], { queryParams: { modal: true } });
            }
          });
      });

    this.messagingService.receiveMessage();

    this.messagingService.currentMessage.subscribe(message => {
      this.message = message;

      if (this.message) {
        this.showAlert('alert');

        this.alertService.success(this.message.notification.body);
      }
    });
  }

  showAlert(target) {
    this[target].clear();

    const factory = this.cfr.resolveComponentFactory(NotifyComponent);

    const ref = this[target].createComponent(factory);

    ref.changeDetectorRef.detectChanges();
  }

  onMonth(event) {
    this.month = event;
  }
}
