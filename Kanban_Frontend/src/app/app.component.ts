import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "./services/authentication.service";
import {NotificationService} from "./services/notification.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'My Work Planner';

  constructor(
    private authentication: AuthenticationService,
    private notification: NotificationService) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('token') != null) {
      this.authentication.getUserProfile();
      this.notification.getNotification();
    }
  }
}
