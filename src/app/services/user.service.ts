import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  catchError,
  filter,
  Subject,
  Subscription,
  switchMap,
  tap,
  throwError
} from "rxjs";
import { IUser } from "../model/IUser";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Injectable({ providedIn: "root" })
export class UserService {

  loginSubject = new Subject<IUser>();
  registerSubject = new Subject<IUser>();

  loginInfo$ = this.loginSubject.asObservable();
  registerSubject$ = this.registerSubject.asObservable();
  logout$: Subscription | undefined;

  login$ = this.loginInfo$.pipe(
    filter((user: IUser) => (Object.keys(user).length > 0)),
    switchMap(user => this.http.post<{token: string, user: IUser}>('user/login', user)),
    tap((res) => this.setTokenToLocalStorage(res.token)),
    catchError(err => this.handleError('Please check your credentials and try again!', 'Unable to login', err)),
  )

  register$ = this.registerSubject$.pipe(
    filter((user: IUser) => (Object.keys(user).length > 0)),
    switchMap(user => this.http.post<{token: string, user: IUser}>('user/register', user)),
    tap((res) => this.setTokenToLocalStorage(res.token)),
    catchError(err => this.handleError('Please check your credentials and try again!', 'Unable to register', err))
  )

  logout() {
     this.logout$ = this.http.post('user/logout', {}).subscribe(() => {
        localStorage.removeItem('token')
        this.route.navigateByUrl('login')
     })
  }

  isLoggedIn() {
    return localStorage.getItem('token') !== null
  }

  getToken() {
    return localStorage.getItem('token')
  }

  setTokenToLocalStorage(token: string) {
    localStorage.setItem('token', token)
    this.route.navigateByUrl('')
  }

  handleError(errorMessage: string, errorTitle: string, error: any) {
    this.toastService.error(errorMessage, errorTitle, {
      timeOut: 3000,
    });
    return throwError(error);
  }

  constructor(private http: HttpClient, private route: Router, private toastService: ToastrService) {}


}
