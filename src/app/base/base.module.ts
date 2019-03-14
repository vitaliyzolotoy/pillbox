import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanComponent } from '../plan/plan.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SpinnerComponent} from '../spinner/spinner.component';
import {NotifyComponent} from '../notify/notify.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    PlanComponent,
    SpinnerComponent,
    NotifyComponent
  ],
  exports: [
    PlanComponent,
    SpinnerComponent
  ],
  entryComponents: [NotifyComponent]
})
export class BaseModule { }
