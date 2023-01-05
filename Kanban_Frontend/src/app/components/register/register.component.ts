import {Component} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {User} from "../../model/user/User";
import {AuthenticationService} from "../../services/authentication.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  userForm = this.fb.group({
    firstName: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.pattern('[a-zA-Z ]*')]],
    lastName: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.pattern('[a-zA-Z ]*')]],
    email: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(25), Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)]],
    password: [null, [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]],
    confirmPassword: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(12), Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]],
    mobileNumber: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(12), Validators.pattern(/^\+[1-9]{2}-[0-9]{3}-[0-9]{3}-[0-9]{4}$/)]],
  });

  constructor(private fb: FormBuilder, private authentication: AuthenticationService, private snackBar: MatSnackBar) {
  }

  onSubmit(): void {
    let user: User = {
      firstName: this.userForm.get('firstName')?.value,
      lastName: this.userForm.get('lastName')?.value,
      email: this.userForm.get('email')?.value,
      password: this.userForm.get('password')?.value,
      mobileNumber: this.userForm.get('mobileNumber')?.value
    }
    this.authentication.registerUser(user).subscribe({
      next: () => {
        this.snackBar.open("Registered Successfully!", "Close");
      },
      error: (err) => {
        if (err.status === 409) {
          this.snackBar.open("Email already exists!", "Close");
        } else {
          this.snackBar.open("Internal server error!", "Close");
        }
      }
    });
  }
}
