import {Component, OnInit} from '@angular/core';
import { AuthService } from '../shared/security/auth.service';
import {AuthInfo} from '../shared/security/auth-info';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {PaymentService} from '../shared/payment/payment.service';
import {AnalyticsService} from '../shared/analytics/analytics.service';
import {MessagingService} from '../shared/messaging/messaging.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  authInfo: AuthInfo;
  visibility = false;
  trial;
  status;
  message;

  constructor(private authService: AuthService,
              private activatedRoute: ActivatedRoute,
              public paymentService: PaymentService,
              private router: Router,
              private analyticsService: AnalyticsService,
              private messagingService: MessagingService) {
    this.analyticsService.trackPageViews();
  }

  ngOnInit() {
    this.authService.authInfo$.subscribe(authInfo => {
      console.log(authInfo);

      this.authInfo = authInfo;
    });

    this.activatedRoute.parent.queryParams.subscribe((params: any) => {
      if (params) {
        this.visibility = params.modal;
      }
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
      // alert(message);
    });
  }
}
