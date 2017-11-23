import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { OrganizerComponent } from './organizer/organizer.component';
import { CaptionComponent } from './caption/caption.component';
import { PortionsComponent } from './portions/portions.component';

@NgModule({
  declarations: [
    AppComponent,
    OrganizerComponent,
    CaptionComponent,
    PortionsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
