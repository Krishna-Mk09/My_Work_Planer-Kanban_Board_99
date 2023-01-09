import {Injectable} from '@angular/core';
import emailjs, {EmailJSResponseStatus} from "@emailjs/browser";
import {User} from "../model/user/User";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() {
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
}
