import { Component, OnInit } from '@angular/core'
import { UserService } from 'src/app/shared/services/user.service';
import { Router } from '@angular/router';
import { UserRegistration } from 'src/app/shared/interfaces/user.registration.interface';
import { finalize, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})

export class CreateAccountComponent implements OnInit {
  errors: string = '';
  isRequesting: boolean = false;
  submitted: boolean = false;
  selectedValue: string = "ESD";
  options = ["ESD"]
  selectedPermission: string = "Default User"
  permissionOptions = [ "Default User", "ESD Member", "ESD Admin", "Wiki Admin"]

  constructor(private userService: UserService, private router: Router) {

  }

  ngOnInit(): void {
  }

  onSelectedChange(value: string) {
    this.selectedValue = value;
  }

  onPermissionChange(value: string) {
    this.selectedPermission = value;
  }

  registerUser({ value, valid }: { value: UserRegistration, valid: boolean }) {
    this.submitted = true;
    this.isRequesting = true;
    this.errors = '';
    if (valid) {
      this.userService.register(value)
        .pipe( finalize(() => this.isRequesting = false) )
        .subscribe((result) => { if (result) { this.router.navigate(['/admin/dashboard']) } },
                    err => this.errors = JSON.parse(err._body).DuplicateUserName
      );
    }
  } 
}
