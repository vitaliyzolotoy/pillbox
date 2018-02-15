import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { OrganizerComponent } from '../organizer/organizer.component';
import { CaptionComponent } from '../caption/caption.component';
import { PortionsComponent } from '../portions/portions.component';
import {CommonModule} from '@angular/common';
import {routing} from './home.router';
import { PortionAddComponent } from '../portion-add/portion-add.component';
import {AuthGuard} from '../shared/security/auth.guard';
import {ScheduleService} from '../shared/model/schedule.service';
import {ReactiveFormsModule} from '@angular/forms';
import {ReceptumsService} from '../shared/model/receptums.service';
import { ReceptumFormComponent } from '../receptum-form/receptum-form.component';
import { WeekComponent } from '../week/week.component';
import { SettingsComponent } from '../settings/settings.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { HeaderComponent } from '../header/header.component';

@NgModule({
  declarations: [
    HomeComponent,
    OrganizerComponent,
    CaptionComponent,
    PortionsComponent,
    PortionAddComponent,
    ReceptumFormComponent,
    WeekComponent,
    SettingsComponent,
    SpinnerComponent,
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    routing,
    ReactiveFormsModule
  ],
  providers: [
    AuthGuard,
    ScheduleService,
    ReceptumsService
  ],
  bootstrap: [HomeComponent]
})
export class HomeModule { }
