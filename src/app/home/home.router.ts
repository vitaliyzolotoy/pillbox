import {Route, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {HomeComponent} from './home.component';
import {PortionAddComponent} from '../portion-add/portion-add.component';
import {AuthGuard} from '../shared/security/auth.guard';
// import {CalendarDetailsComponent} from '../calendar-details/calendar-details.component';
// import {NewEventComponent} from '../new-event/new-event.component';
// import {CalendarsComponent} from '../calendars/calendars.component';
// import {PaymentComponent} from '../payment/payment.component';

const routes: Route[] = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      // {
      //   path: 'calendars',
      //   children: [
      //     {
      //       path: ':key',
      //       children: [
      //         {
      //           path: '',
      //           component: CalendarDetailsComponent
      //         },
      //         {
      //           path: 'new',
      //           component: NewEventComponent
      //         }
      //       ]
      //     },
      //     {
      //       path: '',
      //       component: CalendarsComponent
      //     }
      //   ]
      // },
      {
        path: ':key',
        component: PortionAddComponent
      }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
