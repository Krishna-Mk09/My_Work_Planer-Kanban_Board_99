import {Component, OnInit} from '@angular/core';
import {NotificationService} from "../../services/notification.service";
import {Notification} from "../../model/notification/Notification";


@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  currentUserNotification?: Notification;

  constructor(
    private notificationService: NotificationService
  ) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.currentUserNotification = this.notificationService.currentUserNotifications;
      console.log(this.currentUserNotification);

    }, 1000)
  }

  deleteNotification(message: string) {
    this.currentUserNotification?.message?.splice(this.currentUserNotification?.message?.indexOf(message), 1);
    this.notificationService.updateNotification(this.currentUserNotification!);
  }
}
