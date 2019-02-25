import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.scss']
})
export class WeekComponent implements OnInit {
  @Input() week;
  @Input() schedule;
  @Input() date;
  @Input() key;
  @Input() trial;
  // @Output() active = new EventEmitter();
  dayOfWeek;
  current;

  constructor() { }

  ngOnInit() {
    this.dayOfWeek = new Date().getDay() || 7;

    // console.log(this.dayOfWeek - 1)

    this.current = this.week[this.dayOfWeek - 1];

    // this.active.emit(this.current);

    // console.log(this.current);

    // console.log(this.schedule);
    // console.log(this.week);
  }
}
