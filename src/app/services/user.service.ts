import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
  catchError, combineLatest, EMPTY,
  filter, map, merge,
  Subject,
  switchMap,
  tap,
} from "rxjs";
import { IUser } from "../model/IUser";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Injectable({ providedIn: "root" })
export class UserService {

  private loginSubject = new Subject<IUser>();
  private registerSubject = new Subject<IUser>();
  private logoutEventSubject = new Subject<void>();

  loginInfo$ = this.loginSubject.asObservable();
  registerInfo$ = this.registerSubject.asObservable();

  loggedInUser$ = this.loginInfo$.pipe(
    filter((user: IUser) => (Object.keys(user).length > 0)),
    switchMap(user => this.http.post<{token: string, user: IUser}>('user/login', user)
      .pipe(
        tap((res) => this.setTokenToLocalStorage(res.token)),
        catchError(() => this.handleError('Please check your credentials and try again!', 'Unable to login')),
        map((response) => response.user),
      )
    )
  )

  registeredUser$ = this.registerInfo$.pipe(
    filter((user: IUser) => (Object.keys(user).length > 0)),
    switchMap(user => this.http.post<{token: string, user: IUser}>('user/register', user)
      .pipe(
        tap((res) => this.setTokenToLocalStorage(res.token)),
        catchError(() => this.handleError('Please check your credentials and try again!', 'Unable to login')),
        map((response) => response.user),
      )
    )
  )

  userInfo$ = merge([this.loggedInUser$, this.registeredUser$]).pipe(
    switchMap(user => user)
  )

  logout$ = this.logoutEventSubject.asObservable().pipe(
    switchMap(() => this.http.post('user/logout', {}).pipe(
      tap(() => {
        localStorage.removeItem('token')
        this.route.navigateByUrl('auth')
      }),
      catchError(err => this.handleError(err.message, 'Unable to logout')),
    ))
  )

  logoutUser() {
    this.logoutEventSubject.next()
  }

  setLoginInfo(user: IUser) {
    this.loginSubject.next(user);
  }

  setRegisterInfo(user: IUser) {
    this.registerSubject.next(user);
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

  handleError(errorMessage: string, errorTitle: string) {
    this.route.navigateByUrl('auth').then(() => {
      this.toastService.error(errorMessage, errorTitle, {
        timeOut: 3000,
      });
    })
    return EMPTY;
  }

  constructor(private http: HttpClient, private route: Router, private toastService: ToastrService) {}


}
