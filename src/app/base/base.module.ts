import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanComponent } from '../plan/plan.component';
import {ReactiveFormsModule} from '@angular/forms';
import {SpinnerComponent} from '../spinner/spinner.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    PlanComponent,
    SpinnerComponent
  ],
  exports: [
    PlanComponent,
    SpinnerComponent
  ]
})
export class BaseModule { }
