import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {User} from "../../model/user/User";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(public authentication: AuthenticationService) { }

  currentUser?: User;

  updateUser(): void {
    console.log(this.currentUser)
    this.authentication.updateUserProfile(this.currentUser!);
  }




  ngOnInit(): void {
    setTimeout(() => {
      this.currentUser = this.authentication.currentUser;
    },1000)

  }

}
