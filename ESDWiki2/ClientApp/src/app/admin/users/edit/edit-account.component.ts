import { Component, OnInit } from '@angular/core'
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';
import { UserRegistration } from 'src/app/shared/interfaces/user.registration.interface';
import { finalize, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { User } from 'src/app/shared/user';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'create-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})

export class EditAccountComponent implements OnInit {
  user: User
  errors: string = '';
  isRequesting: boolean = false;
  submitted: boolean = false;

  constructor(private userService: UserService, private router: Router, private dataService: DataService) {

  }

  ngOnInit(): void {
    this.user = this.dataService.selectedUserToEdit
    if (this.user == undefined) {
      this.router.navigate(['admin/users'])
    }
  }
  
}
