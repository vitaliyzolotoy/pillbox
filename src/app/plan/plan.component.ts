import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {
  @Output() id: EventEmitter<any> = new EventEmitter();
  form: FormGroup;
  price = {
    yearly: {
      id: 525179
    },
    monthly: {
      id: 525180
    },
    test: {
      id: 525231
    }
  };
  free = environment.free;

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      plan: [null]
    });
  }

  ngOnInit() {
    this.form.valueChanges
      .subscribe(form => {
        this.id.emit(this.price[form.plan].id);
      });
  }

}
