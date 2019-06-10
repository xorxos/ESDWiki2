import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.styles.css']
})
export class TopNavBarComponent implements OnInit, OnDestroy {
  title = 'ESD Wiki';

  status: boolean
  isNavbarCollapsed: boolean = true;
  email: string

  subscription: Subscription
  userName: Subscription

  constructor(private userService: UserService) {

  }

  logout() {
    this.userService.logout();
  }

  ngOnInit() {
    // Getting and storing subscription values
    this.subscription = this.userService.authNavStatus$.subscribe(status => this.status = status);
    this.userName = this.userService.currentUserEmail$.subscribe(userName => this.email = userName);

    // Need to set our Role subscriptions in case of page reload without re-login
    this.userService.isWikiAdmin();
    this.userService.isWikiUser();
    this.userService.isESDTeamAdmin();
    this.userService.isESDTeamMember();
  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.subscription.unsubscribe();
    this.userName.unsubscribe();
  }
}
