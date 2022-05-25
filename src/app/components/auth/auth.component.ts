import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../services/user.service";
import { Observable } from "rxjs";
import { IUser } from "../../model/IUser";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  isRegister = false;
  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.compose([Validators.required, Validators.email])]],
    password: ['', [Validators.compose([Validators.required, Validators.minLength(8)])]],
    name: [''],
    age: ['']
  });

  userInfo$: Observable<IUser> = this.userService.userInfo$;

  constructor(private formBuilder: FormBuilder, private userService: UserService) { }

  onSubmitUser() {
    if (this.loginForm?.valid && !this.isRegister) {
      this.userService.setLoginInfo({
        email: this.loginForm?.get('email')?.value,
        password: this.loginForm?.get('password')?.value
      })
    } else {
      this.userService.setRegisterInfo(this.loginForm.value);
    }
    this.loginForm.markAllAsTouched();
  }

}
