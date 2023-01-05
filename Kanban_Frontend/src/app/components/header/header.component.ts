import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authentication: AuthenticationService) {
  }

  ngOnInit(): void {
  }

  logout() {
    this.authentication.logoutUser();
  }
}
