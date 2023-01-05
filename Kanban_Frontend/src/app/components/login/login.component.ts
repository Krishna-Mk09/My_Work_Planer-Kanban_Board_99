import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private authentication: AuthenticationService) {
  }

  ngOnInit(): void {
  }

  onSubmit(logInForm: NgForm): void {
    if (logInForm.valid && logInForm.value != null) {
      this.authentication.loginUser(logInForm.value);
    }
  }

}
