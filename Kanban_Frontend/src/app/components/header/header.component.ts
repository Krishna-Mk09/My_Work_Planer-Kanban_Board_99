import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {User} from "../../model/user/User";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-header', templateUrl: './header.component.html', styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  mobileMenu: boolean = false;
  currentUser?: User;
  isLoggedIn: boolean = false;

  constructor(
    private authentication: AuthenticationService,
    public dialog: MatDialog) {
  }

  ngOnInit(): void {
    if (`${localStorage.getItem('token')}` !== "null") {
      this.isLoggedIn = true;
      setTimeout(() => {
        this.currentUser = this.authentication.currentUser;
      }, 1000)
    }
  }

  logout() {
    this.authentication.logoutUser();
    window.location.reload();
  }

  notificationPopUp() {
    const dialogRef = this.dialog.open(NotificationPopupDialog,{
      width: '500px',
    })
  }
}

@Component({
  selector: 'notification-popup-dialog',
  templateUrl: './notification-popup-dialog.html'
})
export class NotificationPopupDialog implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }


}
