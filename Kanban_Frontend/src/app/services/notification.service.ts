import {Injectable} from '@angular/core';
import emailjs, {EmailJSResponseStatus} from "@emailjs/browser";
import {User} from "../model/user/User";
import {HttpClient} from "@angular/common/http";
import {Notification} from "../model/notification/Notification";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  endPointURL: string = "http://localhost:9005/notification";
  currentUserNotifications?: Notification;

  constructor(private httpClient: HttpClient) {
  }

  sendMail(user: User) {
    emailjs.send('service_rgng4h9', 'template_o0g8box', {
      email: user.email,
      firstName: user.firstName
    }, 'Od0j_0-70INVVvAMZ')
      .then((result: EmailJSResponseStatus) => {
          console.log(result.text);
        }, (error) => {
          console.log(error.text);
        }
      )
  }

  getNotification() {
    this.httpClient.get<Notification>(`${this.endPointURL}/getByEmail/${localStorage.getItem('user_email')}`)
      .subscribe({
        next: (response) => this.currentUserNotifications = response,
        error: (err) => console.log(err)
      })
  }

  updateNotification(notification: Notification) {
    this.httpClient.put<Notification>(`${this.endPointURL}/updateNotification`, notification)
      .subscribe({
        next: (response) => this.currentUserNotifications = response,
        error: (err) => console.log(err)
      })
  }

}
