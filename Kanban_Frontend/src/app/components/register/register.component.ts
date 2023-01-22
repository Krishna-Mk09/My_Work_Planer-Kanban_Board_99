import {Component} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {User} from "../../model/user/User";
import {AuthenticationService} from "../../services/authentication.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NotificationService} from "../../services/notification.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  userForm = this.fb.group({
    firstName: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.pattern('[a-zA-Z ]*')]],
    lastName: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(20), Validators.pattern('[a-zA-Z ]*')]],
    email: [null, [Validators.required, Validators.pattern(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i)]],
    password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(12), Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]],
    confirmPassword: [null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/)]],
    mobileNumber: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^[6-9][0-9]{9}/)]],
  }, {validators: [this.mustMatchValidator]});

  constructor(
    private fb: FormBuilder,
    private authentication: AuthenticationService,
    private snackBar: MatSnackBar,
    private notificationService: NotificationService,
    private router: Router) {
  }

  mustMatchValidator(fg: AbstractControl) {
    const passwordValue = fg.get("password")?.value;
    const confirmPasswordValue = fg.get("confirmPassword")?.value;
    if (!passwordValue || !confirmPasswordValue) {
      return null;
    }
    if (passwordValue != confirmPasswordValue) {
      return {mustMatch: false}
    }
    return null;
  }

  onSubmit(): void {
    let user: User = {
      firstName: this.userForm.get('firstName')?.value,
      lastName: this.userForm.get('lastName')?.value,
      email: this.userForm.get('email')?.value,
      password: this.userForm.get('password')?.value,
      mobileNumber: this.userForm.get('mobileNumber')?.value,
      imageURL: "https://res.cloudinary.com/dduwkdctl/image/upload/v1673595767/Kanban%20Project/blank-profile-picture_nodr1y.png",
    }
    this.authentication.registerUser(user).subscribe({
      next: () => {
        this.snackBar.open("Registered Successfully!", "Close", {duration: 3000});
        this.router.navigateByUrl('/login');
      },
      error: (err) => {
        if (err.status === 409) {
          this.snackBar.open("Email already exists!", "Close", {duration: 3000});
        } else {
          this.snackBar.open("Internal server error!", "Close", {duration: 3000});
        }
      }
    });
    this.notificationService.sendMail(user);
  }

}
