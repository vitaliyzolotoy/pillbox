import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-caption',
  templateUrl: './caption.component.html',
  styleUrls: ['./caption.component.scss']
})
export class CaptionComponent implements OnInit {
  @Input() period;
  @Input() day;
  schedule = {
    Morn: '8:00',
    Noon: '14:00',
    Eve: '20:00',
    Bed: '23:00'
  };

  constructor() { }

  ngOnInit() {
    console.log(this.period);
  }

}
