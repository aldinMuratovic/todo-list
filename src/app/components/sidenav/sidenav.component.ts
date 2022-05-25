import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent  {

  @Output() onLogout = new EventEmitter<void>()
  @Output() onAddTask = new EventEmitter<void>()

}
