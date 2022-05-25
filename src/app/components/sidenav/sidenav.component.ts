import { Component } from '@angular/core';
import { AddTaskComponent } from "../add-task/add-task.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent  {

  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(AddTaskComponent, {
      width: '500px',
      height: '400px'
    });
  }
}
