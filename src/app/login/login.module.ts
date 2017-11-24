import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RootComponent} from '../root/root.component';
import {LoginComponent} from './login.component';
import {routing} from './login.router';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    routing
  ],
  declarations: [RootComponent, LoginComponent],
  bootstrap: [
    RootComponent
  ]
})
export class LoginModule { }
