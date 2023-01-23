import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoggedIn: boolean = false;
  firstName?: string ;

  constructor() {
  }

  ngOnInit(): void {
    if (`${localStorage.getItem('token')}` !== "null") {
      setTimeout(() => {this.firstName = `${localStorage.getItem('user_firstname')}`;}, 100);
      this.isLoggedIn = true;
    }
  }
}
