import {Component, Input, OnInit} from '@angular/core';
import {ReceptumsService} from '../shared/model/receptums.service';

@Component({
  selector: 'app-portions',
  templateUrl: './portions.component.html',
  styleUrls: ['./portions.component.scss']
})
export class PortionsComponent implements OnInit {
  @Input() portions;
  @Input() current;

  constructor(private receptumsService: ReceptumsService) { }

  ngOnInit() {
  }

  removeReceptum(key, scheduleItemId) {
    this.receptumsService.removeReceptum(key, scheduleItemId);
  }
}
