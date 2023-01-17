import {Injectable} from '@angular/core';
import {User} from "../model/user/User";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  endPointURL: string = "http://localhost:9005/user";
  currentUser?: User;
  isLoggedIn: boolean = false;

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar) {
  }

  registerUser(user: User) {
    user.email = user?.email?.toLowerCase();
    return this.httpClient.post(`${this.endPointURL}/add`, user);
  }

  loginUser(user: User) {
    user.email = user?.email?.toLowerCase();
    this.httpClient.post(`${this.endPointURL}/login`, user).subscribe({
      next: (response: any) => {
        this.isLoggedIn = true;
        localStorage.setItem('token', response.token);
        localStorage.setItem('user_email', user.email!);
        this.getUserProfile();
        this.snackBar.open("Login Successfully !!!", "Done", {duration: 3000});
        this.router.navigateByUrl("").then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 100);
        });
      },
      error: (err) => {
        if (err.status === 404) {
          this.snackBar.open("Login Failed !!  Email or password is Incorrect", "Okay", {duration: 3000})
        } else {
          this.snackBar.open("Login Failed !!  Internal server Error Please try again after some time", "Okay", {duration: 3000})
        }
      }
    });
  }

  logoutUser() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_firstname');
    this.isLoggedIn = false;
    this.router.navigateByUrl("").then(() => {
      setTimeout(() => {
        window.location.reload()
      }, 100);
    });
  }

  getUserProfile() {
    return this.httpClient.get<User>(
      `${this.endPointURL}/guard/email/${localStorage.getItem('user_email')}`,
      {headers: new HttpHeaders({Authorization: `Bearer ${localStorage.getItem('token')}`})}
    ).subscribe({
      next: (response) => {
        this.currentUser = response;
        this.isLoggedIn = true;
        localStorage.setItem('user_firstname', response.firstName!);
        console.log(this.currentUser)
      }
    });
  }

  getUserByEmail(email: string) {
    return this.httpClient.get<User>(
      `${this.endPointURL}/guard/email/${email}`,
      {headers: new HttpHeaders({Authorization: `Bearer ${localStorage.getItem('token')}`})}
    )
  }

  updateUserProfile(user: User) {
    return this.httpClient.put<User>(
      `${this.endPointURL}/guard/update/${localStorage.getItem('user_email')}`,
      user,
      {headers: new HttpHeaders({Authorization: `Bearer ${localStorage.getItem('token')}`})}
    ).subscribe({
      next: () => this.snackBar.open("Profile Update Successfully !!!", "Done", {duration: 3000}),
      error: (error) => console.log(error)
    })
  }

  deleteUserAccount() {
    return this.httpClient.delete(
      `${this.endPointURL}/guard/delete/${localStorage.getItem('user_email')}`,
      {headers: new HttpHeaders({Authorization: `Bearer ${localStorage.getItem('token')}`})}).subscribe({
      next: () => {
        this.snackBar.open("Your Account has been deleted Permanently", "Okay", {duration: 3000})
      },
    })
  }

  getAllEmails() {
    return this.httpClient.get<string[]>(
      `${this.endPointURL}/guard/all-emails`,
      {headers: new HttpHeaders({Authorization: `Bearer ${localStorage.getItem('token')}`})}
    )
  }
}
