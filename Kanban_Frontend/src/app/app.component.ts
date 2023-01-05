import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "./services/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Kanban_Frontend';

  constructor(private authentication: AuthenticationService) {
  }

  ngOnInit(): void {
    if (localStorage.getItem('token') != null) {
      this.authentication.getUserProfile();
    }
  }
}
