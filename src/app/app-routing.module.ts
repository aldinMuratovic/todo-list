import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { TaskListComponent } from "./components/task-list/task-list.component";
import { TaskContainerComponent } from "./components/task-container/task-container.component";
import { AuthComponent } from "./components/auth/auth.component";
import { AuthGuard } from "./shared/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'all', component: TaskListComponent },
      { path: '', component: TaskContainerComponent }
    ],
  },
  {
    path: 'auth',
    component: AuthComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
