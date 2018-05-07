import {Route, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {HomeComponent} from './home.component';
import {PortionAddComponent} from '../portion-add/portion-add.component';
import {AuthGuard} from '../shared/security/auth.guard';
import {SettingsComponent} from '../settings/settings.component';
import {UpgradeComponent} from '../upgrade/upgrade.component';

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
        path: 'settings',
        component: SettingsComponent
      },
      {
        path: 'upgrade',
        component: UpgradeComponent
      },
      {
        path: ':key',
        component: PortionAddComponent
      }
    ]
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
