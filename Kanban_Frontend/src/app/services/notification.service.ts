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

  /**
   * This function sends an email to the user after they register
   * @param user The user that registered
   */
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

  /**
   * This function fetches the current user's notifications from the database
   * @return Observable with the current user's notifications
   */
  getNotification() {
    this.httpClient.get<Notification>(`${this.endPointURL}/getByEmail/${localStorage.getItem('user_email')}`)
      .subscribe({
        next: (response) => this.currentUserNotifications = response,
        error: (err) => console.log(err)
      })
  }

  /**
   * This function updates the current user's notifications in the database
   * @param notification The notification to update
   */
  updateNotification(notification: Notification) {
    this.httpClient.put<Notification>(`${this.endPointURL}/updateNotification`, notification)
      .subscribe({
        next: (response) => this.currentUserNotifications = response,
        error: (err) => console.log(err)
      })
  }

  /**
   * This function deletes the current user's notifications in the database
   */
  deleteNotification() {
    this.httpClient.delete(`${this.endPointURL}/delete/${localStorage.getItem('user_email')}`)
      .subscribe({
        next: () => console.log("Notification deleted"),
        error: (err) => console.log(err)
      })
  }

}
