import { Injectable } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(private router: Router) { }

  trackPageViews() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        (<any>window).ga('set', 'page', event.urlAfterRedirects);
        (<any>window).ga('send', 'pageview');

        (<any>window).ym(50158981, 'hit', event.urlAfterRedirects);
      }
    });
  }

  trackEvent(eventName: string) {
    (<any>window).ga('send', 'event', eventName);

    (<any>window).ym(50158981, 'reachGoal', eventName);
  }
}
