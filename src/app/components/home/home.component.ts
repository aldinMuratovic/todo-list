import { Component } from '@angular/core';
import { UserService } from "../../services/user.service";
import { AddTaskComponent } from "../add-task/add-task.component";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  $logout = this.userService.logout$;

  constructor(private userService: UserService, private dialog: MatDialog) { }

  logoutUser() {
    this.userService.logoutUser()
  }

  openAddTaskModal() {
    this.dialog.open(AddTaskComponent, {
      width: '500px',
      height: '400px'
    });
  }
}
