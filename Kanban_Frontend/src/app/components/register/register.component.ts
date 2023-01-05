import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {User} from "../../model/user/User";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  userObject?: User;


  addressForm = this.fb.group({
    company: null,
    firstName: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.pattern('[a-zA-Z ]*')]],
    lastName: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.pattern('[a-zA-Z ]*')]],
    email: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(25), Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)]],
    password: [null, [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]],
    confirmPassword: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(6), Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]],
    mobileNumber: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(12),Validators.pattern(/^\+[1-9]{2}-[0-9]{3}-[0-9]{3}-[0-9]{4}$/)]],
  });

  constructor(private fb: FormBuilder) {
  }

  onSubmit(): void {
  }
}
