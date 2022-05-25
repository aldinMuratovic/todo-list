import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-navbar',
  templateUrl: './task-navbar.component.html',
  styleUrls: ['./task-navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskNavbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
