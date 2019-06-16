import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Credentials } from '../../shared/interfaces/credentials.interface';
import { UserService } from '../../shared/services/user.service';

import { finalize } from 'rxjs/operators'
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})

export class LoginFormComponent implements OnInit, OnDestroy {

  private subscription: Subscription;

  brandNew: boolean;
  errors: string;
  isRequesting: boolean;
  submitted: boolean = false;
  credentials: Credentials = { email: '', password: '' };

  constructor(private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute, private data: DataService) { }

  ngOnInit() {

    // subscribe to router event
    this.subscription = this.activatedRoute.queryParams.subscribe(
      (param: any) => {
        this.brandNew = param['brandNew'];
        this.credentials.email = param['email'];
      });
  }

  ngOnDestroy() {
    // prevent memory leak by unsubscribing
    this.subscription.unsubscribe();
  }

  login({ value, valid }: { value: Credentials, valid: boolean }) {
    this.submitted = true;
    this.isRequesting = true;
    this.errors = '';
    let creds = {
      username: value.email,
      password: value.password
  };
    if (valid) {
      this.data.login(creds).subscribe(
          success => {
            if (success) {
              this.isRequesting = false;
              console.log(localStorage.getItem('jwt'))
              this.router.navigate(['/browse']);
            }
          },
          error => {
            this.errors = "Incorrect username or password"
          });
    }
  }
}
