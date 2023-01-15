import {Component, Inject, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {User} from "../../model/user/User";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../../services/notification.service";
import {Notification} from "../../model/notification/Notification";

export interface MessageData {
  messages: string[];
}

@Component({
  selector: 'app-header', templateUrl: './header.component.html', styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  mobileMenu: boolean = false;
  currentUser?: User;
  isLoggedIn: boolean = false;
  currentUserNotification?: Notification;

  constructor(
    private authentication: AuthenticationService,
    public dialog: MatDialog,
    private notification: NotificationService) {
  }

  ngOnInit(): void {
    if (`${localStorage.getItem('token')}` !== "null") {
      this.isLoggedIn = true;
      setTimeout(() => {
        this.currentUser = this.authentication.currentUser;
        this.currentUserNotification = this.notification?.currentUserNotifications;
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

  constructor(
    public dialogRef: MatDialogRef<NotificationPopupDialog>,
    @Inject(MAT_DIALOG_DATA) public data: MessageData
  ) {
  }

  ngOnInit(): void {
  }


}
