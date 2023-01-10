import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(private authentication: AuthenticationService) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoggedIn = this.authentication.isLoggedIn;
    }, 1000)
  }

}
