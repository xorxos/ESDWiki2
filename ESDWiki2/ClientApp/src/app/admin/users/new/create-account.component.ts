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

  constructor(private userService: UserService, private router: Router) {

  }

  ngOnInit(): void {
  }

  registerUser({ value, valid }: { value: UserRegistration, valid: boolean }) {
    this.submitted = true;
    this.isRequesting = true;
    this.errors = '';
    if (valid) {
      this.userService.register(value.email, value.password, value.firstName, value.lastName, value.team, true, false, false, false)
        .pipe( finalize(() => this.isRequesting = false) )
        .subscribe((result) => console.log('HTTP response', result),
                    error => console.log('HTTP Error', error),
                    () => console.log('HTTP request completed.')
      );
    }
  } 
}
