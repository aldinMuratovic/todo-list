import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, } from '@angular/router';
import { UserService } from "../services/user.service";
import { Observable } from "rxjs";
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private userService: UserService,
              private toastr: ToastrService,
              private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.userService.isLoggedIn()) {
      this.router.navigate(['auth']).then(() => {
        this.toastr.error('Login is Required to Access This Page!', 'Access Denied', {
          timeOut: 3000,
        });
      });
    }
    return true;
  }

}
