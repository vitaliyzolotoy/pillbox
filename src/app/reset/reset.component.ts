import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../shared/security/auth.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {
  resetForm: FormGroup;
  check = false;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private activatedRoute: ActivatedRoute) {
    this.resetForm = fb.group({
      email: ['', [
        Validators.required,
        Validators.email
      ]]
    });
  }

  ngOnInit() {
    this.activatedRoute.parent.queryParams.subscribe((params: any) => {
      if (params) {
        this.resetForm.patchValue({
          email: params.email
        });
      }
    });
  }

  requestPass() {
    const formValue = this.resetForm.value;

    this.authService.requestPass(formValue.email)
      .then(data => {
        this.check = true;
      });
  }

  isErrorVisible(field: string, error: string) {
    return this.resetForm.controls[field].dirty
      && this.resetForm.controls[field].errors
      && this.resetForm.controls[field].errors[error];

  }
}
