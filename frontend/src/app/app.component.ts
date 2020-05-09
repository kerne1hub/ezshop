import { Component } from '@angular/core';
import {AuthenticationService} from "./services/authentication.service";
import {User} from "./common/user";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ezshop';
  currentUser: User;

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(
      user => this.currentUser = user
    )
  }

  logout() {
    this.authenticationService.logout();
  }

}
