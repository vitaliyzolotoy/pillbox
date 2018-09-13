import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { OrganizerComponent } from '../organizer/organizer.component';
import { CaptionComponent } from '../caption/caption.component';
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
import { UpgradeComponent } from '../upgrade/upgrade.component';
import {SubscriptionModule} from '../subscription/subscription.module';
import * as moment from 'moment';
import { NotifyComponent } from '../notify/notify.component';
import {ReceptumsComponent} from '../receptums/receptums.component';

@NgModule({
  declarations: [
    HomeComponent,
    OrganizerComponent,
    CaptionComponent,
    ReceptumsComponent,
    PortionAddComponent,
    ReceptumFormComponent,
    WeekComponent,
    SettingsComponent,
    SpinnerComponent,
    HeaderComponent,
    UpgradeComponent,
    NotifyComponent
  ],
  imports: [
    CommonModule,
    routing,
    ReactiveFormsModule,
    SubscriptionModule
  ],
  providers: [
    AuthGuard,
    ScheduleService,
    ReceptumsService,
    { provide: 'moment', useFactory: (): any => moment }
  ],
  bootstrap: [HomeComponent]
})
export class HomeModule { }
