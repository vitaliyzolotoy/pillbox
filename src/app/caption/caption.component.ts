import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-caption',
  templateUrl: './caption.component.html',
  styleUrls: ['./caption.component.scss']
})
export class CaptionComponent implements OnInit {
  @Input() period;
  @Input() day;

  constructor() { }

  ngOnInit() {
  }

}
