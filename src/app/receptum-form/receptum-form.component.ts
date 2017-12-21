import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {isNumber} from 'util';

@Component({
  selector: 'app-receptum-form',
  templateUrl: './receptum-form.component.html',
  styleUrls: ['./receptum-form.component.scss']
})
export class ReceptumFormComponent implements OnInit {
  form: FormGroup;
  showSelect = true;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      quantity: [null, Validators.required],
      name: ['', Validators.required],
      dose: [null, Validators.required],
      repeat: [false],
      day: [null]
    });

    // this.form.valueChanges
    //   .subscribe(form => {
    //     if (form.repeat) {
    //       this.showSelect = true;
    //     }
    //   });
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

  showSelectHandle() {
    this.showSelect = !this.showSelect;
  }
}
