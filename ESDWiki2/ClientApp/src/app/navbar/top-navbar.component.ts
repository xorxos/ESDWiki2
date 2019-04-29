import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

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
  isWikiAdmin: boolean = false

  constructor(private userService: UserService) {

  }

  logout() {
    this.userService.logout();
  }

  ngOnInit() {
    this.subscription = this.userService.authNavStatus$.subscribe(status => this.status = status)
    this.userName = this.userService.currentUserEmail$.subscribe(userName => this.email = userName);
    this.isWikiAdmin = this.userService.isWikiAdmin()
  }

  ngOnDestroy() {
    // prevent memory leak when component is destroyed
    this.subscription.unsubscribe();
  }
}
