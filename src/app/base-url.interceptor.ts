import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { UserService } from "./services/user.service";

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    request = request.clone({ url: `${environment.apiUrl}/${request.url}` });
    const isApiUrl = request.url.startsWith(environment.apiUrl);

    if (this.userService.isLoggedIn() && isApiUrl) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${this.userService.getToken()}` }
      });
    }

    return next.handle(request);
  }

  constructor(private userService: UserService) {}
}
