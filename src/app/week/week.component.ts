import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.scss']
})
export class WeekComponent implements OnInit {
  @Input() week;
  @Input() schedule;
  current;

  constructor() { }

  ngOnInit() {
    this.current = this.week[new Date().getDay()];
  }

  setCurrent(current) {
    this.current = current;
  }
}
