import {Component, Input, OnInit} from '@angular/core';
import {ReceptumsService} from '../shared/model/receptums.service';
import {TaskService} from '../shared/task/task.service';

@Component({
  selector: 'app-receptums',
  templateUrl: './receptums.component.html',
  styleUrls: ['./receptums.component.scss']
})
export class ReceptumsComponent implements OnInit {
  @Input() receptums;
  @Input() current;

  constructor(private receptumsService: ReceptumsService,
              private taskService: TaskService) { }

  ngOnInit() {
  }

  removeReceptum(key, scheduleItemId) {
    this.receptumsService.removeReceptum(key, scheduleItemId);
    this.taskService.deleteTask(key);
  }
}
