import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-portions',
  templateUrl: './portions.component.html',
  styleUrls: ['./portions.component.scss']
})
export class PortionsComponent implements OnInit {
  @Input() portions;

  constructor() { }

  ngOnInit() {
  }

}
