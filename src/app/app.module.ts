import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { OrganizerComponent } from './organizer/organizer.component';
import { EventComponent } from './event/event.component';

@NgModule({
  declarations: [
    AppComponent,
    OrganizerComponent,
    EventComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
