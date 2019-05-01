import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable, BehaviorSubject } from 'rxjs';

import { UserService } from '../shared/services/user.service';
import { COMPONENT_FACTORY_RESOLVER } from '@angular/core/src/render3/ng_module_ref';

@Component({
  selector: 'top-navbar',
  templateUrl: './top-navbar.component.html',
  styleUrls: ['./top-navbar.styles.css']
})
export class TopNavBarComponent implements OnInit, OnDestroy {
  title = 'ESD Wiki';

  status: boolean

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

    console.log("ESDTeamMember?:  " + this.userService.isESDTeamMember())
    console.log("ESDTeamAdmin?:  " + this.userService.isESDTeamAdmin())
    console.log("WikiUser?:  " + this.userService.isWikiUser())
    console.log("WikiAdmin?:  " + this.userService.isWikiAdmin())
  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.subscription.unsubscribe();
    this.userName.unsubscribe();
  }
}
