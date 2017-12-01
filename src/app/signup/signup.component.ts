import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../shared/security/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router) {
    this.form = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirm: ['', Validators.required]
    });
  }

  isPasswordMatch() {
    const val = this.form.value;

    return val && val.password && val.password === val.confirm;
  }

  signUp() {
    const formValue = this.form.value;

    this.authService.signUp(formValue.email, formValue.password)
      .subscribe(
        () => {
          alert('User creates successfully');
          this.router.navigate(['/home']);
        },
        alert
      );
  }
}
