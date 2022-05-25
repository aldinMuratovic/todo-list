import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { BaseUrlInterceptor } from "./base-url.interceptor";
import { HomeComponent } from './components/home/home.component';
import { MatSidenavModule } from "@angular/material/sidenav";
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { TaskContainerComponent } from './components/task-container/task-container.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskNavbarComponent } from './components/task-navbar/task-navbar.component';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatBadgeModule } from "@angular/material/badge";
import { MatButtonModule } from "@angular/material/button";
import { MeetingCardComponent } from './components/meeting-card/meeting-card.component';
import { MatCardModule } from "@angular/material/card";
import { AddTaskComponent } from './components/add-task/add-task.component';
import { MatDialogModule } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { AuthComponent } from './components/auth/auth.component';
import { ReactiveFormsModule } from "@angular/forms";
import { ToastrModule } from "ngx-toastr";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidenavComponent,
    TaskContainerComponent,
    TaskListComponent,
    TaskNavbarComponent,
    MeetingCardComponent,
    AddTaskComponent,
    AuthComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatMenuModule,
    MatIconModule,
    MatCheckboxModule,
    MatBadgeModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot()
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: BaseUrlInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
