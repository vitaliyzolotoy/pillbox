import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RootComponent} from '../root/root.component';
import {LoginComponent} from './login.component';
import {routing} from './login.router';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireModule} from 'angularfire2';
import {AngularFireAuth} from 'angularfire2/auth';
import {AuthService} from '../shared/security/auth.service';
import {firebaseConfig} from '../../environments/firebase.config';
import { SignupComponent } from '../signup/signup.component';
import {PaymentService} from '../shared/payment/payment.service';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule,
    routing,
  ],
  providers: [
    AuthService,
    AngularFireAuth,
    PaymentService
  ],
  declarations: [
    RootComponent,
    LoginComponent,
    SignupComponent
  ],
  bootstrap: [
    RootComponent
  ]
})
export class LoginModule { }
