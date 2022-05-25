import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../services/user.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  isRegister = false;
  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.compose([Validators.required, Validators.email])]],
    password: ['', Validators.required],
    name: [''],
    age: ['']
  });

  login$ = this.userService.login$

  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  onSubmitUser() {
    if (this.loginForm?.valid && !this.isRegister) {
      this.userService.loginSubject.next({
        email: this.loginForm?.get('email')?.value,
        password: this.loginForm?.get('password')?.value
      })
    } else {
      this.userService.registerSubject.next(this.loginForm.value);
    }
    this.loginForm.markAllAsTouched();
  }

}
