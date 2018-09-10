import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {interval} from 'rxjs';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.scss']
})
export class NotifyComponent implements OnInit, OnChanges {
  @Input() message;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.message.currentValue) {
      interval(5000)
        .take(1)
        .subscribe(x => {
          this.message = null;
        });
    }
  }

  hideNotify() {
    this.message = null;
  }
}
