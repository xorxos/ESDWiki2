import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router';
import { User } from 'src/app/shared/user';
import { DataService } from 'src/app/shared/services/data.service';
import { EditUser } from 'src/app/shared/interfaces/edit.user.interface';
import { UserService } from 'src/app/shared/services/user.service';
import { finalize } from 'rxjs/operators';

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

  selectedPermission: string;
  permissionOptions = ["Default User", "ESD Member", "ESD Admin", "Wiki Admin"]
  selectedValue: string;
  options = ["ESD"]

  constructor(private router: Router, private dataService: DataService, private userService: UserService) {

  }

  ngOnInit(): void {
    this.user = this.dataService.selectedUserToEdit
    if (this.user == undefined) {
      this.router.navigate(['admin/users'])
    } else {
      this.selectedValue = this.user.team;
      this.selectedPermission = this.user.permissions
    }
  }
  
  onSelectedChange(value: string) {
    this.selectedValue = value;
  }

  onPermissionChange(value: string) {
    this.selectedPermission = value;
  }

  editUser({ value, valid }: { value: EditUser, valid: boolean }) {
    this.submitted = true;
    this.isRequesting = true;
    this.errors = '';
    let originalEmail = this.user.email;
    if (valid) {
      this.userService.edit(originalEmail, value.email, value.team, value.permissions)
        .pipe(finalize(() => this.isRequesting = false))
        .subscribe((result) => { if (result) { this.router.navigate(['/admin/dashboard']) } },
        err => this.errors = JSON.parse(err._body).DuplicateUserName
        );
    }
  }

  deleteUser() {
    this.isRequesting = true;
    this.userService.delete(this.user.email).subscribe(success => {
      if (success) {
        this.isRequesting = false;
        this.router.navigate(['/admin/dashboard'])
      }
    })
  }
}
