import { Component } from '@angular/core'
import { User } from 'src/app/shared/user';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'edit-user',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})

export class EditAccountComponent {

  constructor(private userService: UserService) { }

  filter: string = "Email"
  searchString: string = ''

  public users: User[] = [];

  filterSelected(event) {
    this.filter = event.target.value
  }

  updateSearchString(event) {
    if (event != null) {
      this.searchString = event.target.value
    }
  }
  search() {
    if (this.searchString !== "") {
      this.userService.getUserBySearchTerm(this.searchString, this.filter)
        .subscribe(success => {
          if (success) {
            this.users = this.userService.users;
            console.log(this.users[0])
          }
        })
    }
  }
}
