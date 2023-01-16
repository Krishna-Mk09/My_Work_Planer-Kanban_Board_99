import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logInForm = this.fb.group({
    email: [null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)]],
    password: [null, [Validators.required, Validators.minLength(8)]]
  });

  constructor(private authentication: AuthenticationService, private fb: FormBuilder) {
  }

  onSubmit(): void {
    if (this.logInForm.valid && this.logInForm.value != null) {
      this.authentication.loginUser(this.logInForm.value);
    }
  }

  ngOnInit(): void {
  }
}
