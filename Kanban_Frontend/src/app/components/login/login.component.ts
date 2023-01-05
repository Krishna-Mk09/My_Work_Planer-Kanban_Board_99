import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


 // constructor(private loginService: LoginService, private authservice: AuthService, private router: Router) { }
  ngOnInit(): void {
  }
  onSubmit(logInForm: NgForm): void {
  }

}
