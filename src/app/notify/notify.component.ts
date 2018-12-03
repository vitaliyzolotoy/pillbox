import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {interval} from 'rxjs';
import {AlertService} from '../shared/alert/alert.service';

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.scss']
})
export class NotifyComponent implements OnInit, OnChanges {
  // @Input() message;
  message;

  constructor(private alertService: AlertService) { }

  ngOnInit() {
    this.alertService.getMessage().subscribe(message => {
      console.log(message);

      this.message = message;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    // if (changes.message.currentValue) {
    //   interval(5000)
    //     .take(1)
    //     .subscribe(x => {
    //       this.message = null;
    //     });
    // }
  }

  hideNotify() {
    this.message = null;
  }
}
