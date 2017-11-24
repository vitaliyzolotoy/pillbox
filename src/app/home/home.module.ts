// import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HomeComponent } from './home.component';
import { OrganizerComponent } from '../organizer/organizer.component';
import { CaptionComponent } from '../caption/caption.component';
import { PortionsComponent } from '../portions/portions.component';
import {CommonModule} from '@angular/common';
import {routing} from './home.router';
import { PortionAddComponent } from '../portion-add/portion-add.component';

@NgModule({
  declarations: [
    HomeComponent,
    OrganizerComponent,
    CaptionComponent,
    PortionsComponent,
    PortionAddComponent
  ],
  imports: [
    CommonModule,
    routing
  ],
  providers: [],
  bootstrap: [HomeComponent]
})
export class HomeModule { }
