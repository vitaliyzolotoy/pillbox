import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from '../shared/security/auth.service';
import { Router } from '@angular/router';
import {PaymentService} from '../shared/payment/payment.service';
import {stripeConfig} from '../../environments/stripe.config';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  handler: any;
  amount;
  price = {
    yearly: {
      amount: 2400,
      id: 1
    },
    monhtly: {
      amount: 300,
      id: 2
    }
  };

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              public paymentService: PaymentService) {
    this.form = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirm: ['', Validators.required],
      plan: [null, Validators.required]
    });
  }

  ngOnInit() {
    this.configHandler();

    this.form.valueChanges
      .subscribe(form => {
        this.amount = this.price[form.plan] && this.price[form.plan].amount;
      });
  }

  isPasswordMatch() {
    const val = this.form.value;

    return val && val.password && val.password === val.confirm;
  }

  signUp(token) {
    const formValue = this.form.value;

    this.authService.signUp(formValue.email, formValue.password)
      .subscribe(
        () => {
          this.paymentService.processPayment(token, this.price[formValue.plan].id);
          this.paymentService.saveEmail();
          alert('User creates successfully');
          this.router.navigate(['/home']);
        },
        alert
      );
  }

  private configHandler() {
    this.handler = StripeCheckout.configure({
      key: stripeConfig.stripeKey,
      image: 'https://goo.gl/EJJYq8',
      locale: 'auto',
      token: token => {
        this.signUp(token);
      }
    });
  }

  openHandler() {
    this.handler.open({
      name: 'Pillbox',
      amount: this.amount
    });
  }
}
