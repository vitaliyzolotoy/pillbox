import {Route, RouterModule} from '@angular/router';
import {LoginComponent} from './login.component';
import {SignupComponent} from '../signup/signup.component';
import {ResetComponent} from '../reset/reset.component';

const routes: Route[] = [
  {
    path: 'login',
    children: [
      {
        path: '',
        component: LoginComponent
      }
    ]
  },
  {
    path: 'home',
    loadChildren: '../home/home.module#HomeModule'
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'reset',
    component: ResetComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

export const routing = RouterModule.forRoot(routes, { useHash: true });
