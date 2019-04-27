import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClientModule } from '@angular/common/http'

import { UserRegistration } from '../interfaces/user.registration.interface';
import { ConfigService } from '../utils/config.service';

import { BaseService } from "./base.service";

import { Observable, BehaviorSubject } from 'rxjs';

// Add the RxJS Observable operators we need in this app.
import { map, catchError } from "rxjs/operators";
import { Local } from 'protractor/built/driverProviders';

@Injectable()

export class UserService extends BaseService {
  
  baseUrl: string = '';
  private _currentUser = new BehaviorSubject<string>("");
  currentUser$ = this._currentUser.asObservable();

  // Observable navItem source
  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  // Observable navItem stream
  authNavStatus$ = this._authNavStatusSource.asObservable();

  private loggedIn = false;
  private username = "";

  constructor(private http: Http, private configService: ConfigService) {
    super();
    this.loggedIn = !!localStorage.getItem('auth_token');
    this.username = JSON.parse(localStorage.getItem('user_name'));
    // ?? not sure if this the best way to broadcast the status but seems to resolve issue on page refresh where auth status is lost in
    // header component resulting in authed user nav links disappearing despite the fact user is still logged in
    this._authNavStatusSource.next(this.loggedIn);
    this._currentUser.next(this.username);
    this.baseUrl = configService.getApiURI();
    
  }

    register(email: string, password: string, firstName: string, lastName: string, team: string): Observable<UserRegistration> {
    let body = JSON.stringify({ email, password, firstName, lastName, team });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.baseUrl + "/accounts", body, options)
      .pipe(
        map(res => res.json()),
        catchError(this.handleError)
      );
    }

   login(userName, password) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http
      .post(
      this.baseUrl + '/auth/login',
      JSON.stringify({ userName, password }),{ headers }
      )
      .pipe(map(res => res.json()),
      map(res => {
        localStorage.setItem('auth_token', res.auth_token);
        localStorage.setItem('user_name', JSON.stringify(userName));
        this.loggedIn = true;
        this._authNavStatusSource.next(true);
        this._currentUser.next(userName);
        return true;
      }),
      catchError(this.handleError));
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_name');
    this.loggedIn = false;
    this._authNavStatusSource.next(false);
    this._currentUser.next("");
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}

