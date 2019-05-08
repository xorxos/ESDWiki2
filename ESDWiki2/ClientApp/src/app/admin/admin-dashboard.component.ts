import { Component, OnInit } from '@angular/core'
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})

export class AdminDashboardComponent implements OnInit {

    constructor(private userService: UserService) {

    }

    ngOnInit(): void {
      // Need to set our Role subscriptions in case of page reload without re-login
      this.userService.isWikiAdmin();
      this.userService.isWikiUser();
      this.userService.isESDTeamAdmin();
      this.userService.isESDTeamMember();
    }

}
