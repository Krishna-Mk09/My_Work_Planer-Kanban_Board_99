import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {User} from "../../model/user/User";
import {NotificationService} from "../../services/notification.service";
import {Notification} from "../../model/notification/Notification";


@Component({
  selector: 'app-header', templateUrl: './header.component.html', styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  mobileMenu: boolean = false;
  currentUser?: User;
  isLoggedIn: boolean = false;
  currentUserNotification?: Notification;
  isHidden: boolean = false;

  constructor(
    private authentication: AuthenticationService,
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
    // window.addEventListener('scroll', () => {
    //   if (window.scrollY >= 5) {
    //     document.body.style.setProperty('--header-background-color', 'rgba(243, 106, 62, 1)');
    //     document.body.style
    //   } else {
    //     document.body.style.setProperty('--header-background-color', 'rgba(0, 0, 0, 0)');
    //   }
    // })
  }

  logout() {
    this.authentication.logoutUser();
    window.location.reload();
  }
}
