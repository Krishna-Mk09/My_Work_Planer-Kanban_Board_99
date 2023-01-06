import {Injectable} from '@angular/core';
import {User} from "../model/user/User";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  endPointURL: string = "http://localhost:9005/user";
  currentUser?: User;
  isLoggedIn: boolean = false;

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  registerUser(user: User) {
    return this.httpClient.post(`${this.endPointURL}/add`, user);
  }

  loginUser(user: User) {
    this.httpClient.post(`${this.endPointURL}/login`, user).subscribe({
      next: (response: any) => {
        this.isLoggedIn = true;
        localStorage.setItem('token', response.token);
        localStorage.setItem('user_email', user.email!);
        this.getUserProfile();
        this.router.navigateByUrl("dashboard")
      }
    });
  }

  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_email');
    this.isLoggedIn = false;
    // TODO: Update this URL
    this.router.navigateByUrl("");
  }

  getUserProfile() {
    return this.httpClient.get<User>(
      `${this.endPointURL}/guard/email/${localStorage.getItem('user_email')}`,
      {headers: new HttpHeaders({Authorization: `Bearer ${localStorage.getItem('token')}`})}
    ).subscribe({
      next: (response) => {
        this.currentUser = response;
        this.isLoggedIn = true;
        console.log(this.currentUser)
      }
    });
  }

  getAllEmails() {
    return this.httpClient.get(
      `${this.endPointURL}/guard/all-emails`,
      {headers: new HttpHeaders({Authorization: `Bearer ${localStorage.getItem('token')}`})}
    )

  }
}
