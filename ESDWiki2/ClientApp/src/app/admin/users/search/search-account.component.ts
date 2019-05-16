import { Component, OnDestroy } from '@angular/core'
import { User } from 'src/app/shared/user';
import { HttpClient } from '@angular/common/http';
import { UserService } from 'src/app/shared/services/user.service';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'search-user',
  templateUrl: './search-account.component.html',
  styleUrls: ['./search-account.component.css']
})

export class SearchAccountComponent implements OnDestroy {
  selectedUser:User

  constructor(private userService: UserService, private dataService: DataService) { }

  ngOnDestroy() {
    this.dataService.selectedUserToEdit = this.selectedUser
  }

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

  rowClick(user) {
    this.selectedUser = user
    console.log(user)
  }
}
