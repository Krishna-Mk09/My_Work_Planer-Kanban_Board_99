import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {User} from "../../model/user/User";

@Component({
  selector: 'app-header', templateUrl: './header.component.html', styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  aditya: string = "hidden";
  currentUser?: User;
  isLoggedIn: boolean = false;

  constructor(private authentication: AuthenticationService) {
  }

  ngOnInit(): void {
    if (`${localStorage.getItem('token')}` !== "null") {
      this.isLoggedIn = true;
      setTimeout(() => {
        this.currentUser = this.authentication.currentUser;
      }, 1000)
    }
  }

  changeColour() {
    return this.aditya;
  }

  changeColour1() {
    if (this.aditya === "hidden") {
      this.aditya = "visible";
    } else {
      this.aditya = "hidden";
    }
  }

  logout() {
    this.authentication.logoutUser();
    window.location.reload();
  }
}
