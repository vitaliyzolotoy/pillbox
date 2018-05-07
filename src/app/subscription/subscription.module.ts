import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanComponent } from '../plan/plan.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [PlanComponent],
  exports: [PlanComponent]
})
export class SubscriptionModule { }
