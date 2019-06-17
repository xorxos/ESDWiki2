import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClientModule, HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http'

import { JwtHelperService } from '@auth0/angular-jwt';
import { UserRegistration } from '../interfaces/user.registration.interface';
import { ConfigService } from '../utils/config.service';

import { BaseService } from "./base.service";

import { Observable, BehaviorSubject } from 'rxjs';

// Add the RxJS Observable operators we need in this app.
import { map, catchError, tap, retry } from "rxjs/operators";
import { Local } from 'protractor/built/driverProviders';
import { User } from '../user';
import { EditUser } from '../interfaces/edit.user.interface';
import { Router } from '@angular/router';

@Injectable()

export class UserService extends BaseService {
  
  baseUrl: string = '';

  public users: User[] = [];

  // Observable items, mainly for navigation bar
  private _currentUserEmail: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public currentUserEmailObservable: Observable<string> = this._currentUserEmail.asObservable();

  private _isWikiAdminSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  public isWikiAdminObservable: Observable<boolean> = this._isWikiAdminSubject.asObservable()

  private _isWikiUserSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  public isWikiUserObservable: Observable<boolean> = this._isWikiUserSubject.asObservable()
  
  private _isESDTeamMemberSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  public isESDTeamMemberObservable: Observable<boolean> = this._isESDTeamMemberSubject.asObservable()

  private _isESDTeamAdminSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  public isESDTeamAdminObservable: Observable<boolean> = this._isESDTeamAdminSubject.asObservable()

  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  authNavStatus$ = this._authNavStatusSource.asObservable();

  private loggedIn = false;
  private username = "";

  constructor(private http: Http, private configService: ConfigService, private httpClient: HttpClient, private router: Router) {
    super();
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(localStorage.getItem("jwt"));
    this.loggedIn = !!localStorage.getItem('jwt');
    if (decodedToken != null) {
      this.username = decodedToken.sub;
    }
    // ?? not sure if this the best way to broadcast the status but seems to resolve issue on page refresh where auth status is lost in
    // header component resulting in authed user nav links disappearing despite the fact user is still logged in
    this._authNavStatusSource.next(this.loggedIn);
    this._currentUserEmail.next(this.username);
    
  }

  register(value: UserRegistration) {
    let token = localStorage.getItem('jwt')
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token.toString()
      })
    };

    return this.httpClient.post("api/accounts/register", value, httpOptions)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  edit(originalEmail: string, email: string, firstName: string, lastName: string, team: string, permissions: string): Observable<EditUser> {
    let token = localStorage.getItem('jwt')
    let body = JSON.stringify({ originalEmail, email, firstName, lastName, team, permissions });
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': "Bearer " + token.toString()
    });
    let options = new RequestOptions({ headers: headers });
    console.log(originalEmail)
    return this.http.post("api/accounts/" + originalEmail, body, options)
      .pipe(map(res => res.json()));
  }

  public getUserBySearchTerm(lastName: string, filter: string): Observable<boolean> {
    console.log("Getting..")
    let token = localStorage.getItem('jwt')
    let params = new HttpParams();
    params = params.append('searchTerm', lastName);
    params = params.append('filter', filter);
    return this.httpClient.get("/api/accounts", {
      params: params, headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      }) }).pipe(map((data: any[]) => {
      this.users = data;
      return true;
    }));
  }

  public setAuthorizations() {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(localStorage.getItem("jwt"));
    console.log(decodedToken)
    if (!helper.isTokenExpired(localStorage.getItem("jwt"))) {
      this.loggedIn = true;
      this._authNavStatusSource.next(true);
      this._currentUserEmail.next(decodedToken.sub);
      this.isESDTeamAdmin();
      this.isESDTeamMember();
      this.isWikiAdmin();
      this.isWikiUser();
    } else {
      this.logout()
    }
  }

  logout() {
    localStorage.removeItem('jwt');
    this.loggedIn = false;
    this._authNavStatusSource.next(false);
    this._isWikiAdminSubject.next(false);
    this._isWikiUserSubject.next(false);
    this._isESDTeamMemberSubject.next(false);
    this._isESDTeamAdminSubject.next(false);
    this._currentUserEmail.next("");
  }

  isLoggedIn() {
    return this.loggedIn;
  }

  public isWikiAdmin(): boolean {
    let jwt = localStorage.getItem('jwt')
    if (jwt != null) {
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(localStorage.getItem("jwt"));
      let role = decodedToken.role
      if (role === 'Wiki Admin') {
        this._isWikiAdminSubject.next(true);
        return true
      } else return false
    } else return false
  }

  public isWikiUser(): boolean {
    let jwt = localStorage.getItem('jwt')
    if (jwt != null) {
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(localStorage.getItem("jwt"));
      let role = decodedToken.role
      if (role === 'Default User' || role === 'Wiki Admin' || role === 'ESD Member' || role === 'ESD Admin') {
        this._isWikiUserSubject.next(true);
        return true
      } else return false
    } else return false
  }

  public isESDTeamMember(): boolean {
    let jwt = localStorage.getItem('jwt')
    if (jwt != null) {
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(localStorage.getItem("jwt"));
      let role = decodedToken.role
      if (role === 'ESD Member' || role === 'ESD Admin' || role === 'Wiki Admin') {
        this._isESDTeamMemberSubject.next(true);
        return true
      } else return false
    } else return false
  }

  public isESDTeamAdmin(): boolean {
    let jwt = localStorage.getItem('jwt')
    if (jwt != null) {
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(localStorage.getItem("jwt"));
      let role = decodedToken.role
      if (role === 'ESD Admin' || role === 'Wiki Admin') {
        this._isESDTeamAdminSubject.next(true);
        return true
      } else return false
    } else return false
  }
}

