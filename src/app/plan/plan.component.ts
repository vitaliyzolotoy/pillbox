import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss']
})
export class PlanComponent implements OnInit {
  @Output() id: EventEmitter<any> = new EventEmitter();
  @Input() trial = true;

  form: FormGroup;
  price = {
    yearly: {
      id: 525179
    },
    monthly: {
      id: 525180
    },
    test: {
      id: 530377
    }
  };
  free = environment.free;

  constructor(private fb: FormBuilder) {
    this.form = fb.group({
      plan: [null, Validators.required]
    });
  }

  ngOnInit() {
    // console.log(this.free);

    this.form.valueChanges
      .subscribe(form => {
        // console.log(form)

        this.id.emit(this.price[form.plan].id);
      });
  }

}
