import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ReceptumsService} from '../shared/model/receptums.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-portion-add',
  templateUrl: './portion-add.component.html',
  styleUrls: ['./portion-add.component.scss']
})
export class PortionAddComponent implements OnInit {
  form: FormGroup;
  scheduleKey: string;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private receptumsService: ReceptumsService) { }

  ngOnInit() {
    this.scheduleKey = this.route.snapshot.params['key'];
  }

  save(form) {
    this.receptumsService
      .createNewReceptum(this.scheduleKey, form.value)
      .subscribe(
        () => {
          alert('Receptum created');
          form.reset();
        },
        err => alert(`${err}`)
      );
  }
}
