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
  scheduleKey: string;
  schedule: string;

  constructor(private route: ActivatedRoute,
              private receptumsService: ReceptumsService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.scheduleKey = this.route.snapshot.params['key'];

    this.activatedRoute.parent.queryParams.subscribe((params: any) => {
      if (params) {
        this.schedule = params.schedule;
      }
    });
  }

  save(form) {
    // console.log(this.schedule);

    this.receptumsService
      .createNewReceptum(this.scheduleKey, form.value, this.schedule)
      .subscribe(
        () => {
          alert('Receptum created');
          form.reset();
        },
        err => alert(`${err}`)
      );
  }
}
