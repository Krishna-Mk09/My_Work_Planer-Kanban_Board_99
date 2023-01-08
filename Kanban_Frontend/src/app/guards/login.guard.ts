import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from "../services/authentication.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService, private router: Router, private snackbar: MatSnackBar) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authenticationService.isLoggedIn) {
      this.router.navigateByUrl("dashboard");
      return true;
    } else {
      this.snackbar.open("You must be logged in to access this page", "Close", {duration: 3000});
      this.router.navigateByUrl("login");
      return false;
    }
  }

}
