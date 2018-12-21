import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-receptum-form',
  templateUrl: './receptum-form.component.html',
  styleUrls: ['./receptum-form.component.scss']
})
export class ReceptumFormComponent implements OnInit {
  form: FormGroup;
  showOptions = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      quantity: [null, Validators.required],
      type: ['Tablet(s)', Validators.required],
      name: ['', Validators.required],
      dose: [null, Validators.required],
      unit: ['Milligram(s)', Validators.required],
      repeat: [true],
      recurrence: [null],
      timestamp: [null]
    });
  }

  isErrorVisible(field: string, error: string) {
    return this.form.controls[field].dirty
      && this.form.controls[field].errors
      && this.form.controls[field].errors[error];

  }

  reset() {
    this.form.reset();
  }

  get valid() {
    return this.form.valid;
  }

  get value() {
    return this.form.value;
  }

  showOptionsHandle() {
    this.showOptions = !this.showOptions;
  }
}
