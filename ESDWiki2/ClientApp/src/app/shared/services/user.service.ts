import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { HttpClientModule, HttpClient, HttpParams } from '@angular/common/http'

import { UserRegistration } from '../interfaces/user.registration.interface';
import { ConfigService } from '../utils/config.service';

import { BaseService } from "./base.service";

import { Observable, BehaviorSubject } from 'rxjs';

// Add the RxJS Observable operators we need in this app.
import { map, catchError, tap } from "rxjs/operators";
import { Local } from 'protractor/built/driverProviders';
import { User } from '../user';

@Injectable()

export class UserService extends BaseService {
  
  baseUrl: string = '';

  public users: User[] = [];

  // Observable items, mainly for navigation bar
  private _currentUserEmail = new BehaviorSubject<string>("");
  currentUserEmail$ = this._currentUserEmail.asObservable();

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

  constructor(private http: Http, private configService: ConfigService, private httpClient: HttpClient) {
    super();
    this.loggedIn = !!localStorage.getItem('auth_token');
    this.username = JSON.parse(localStorage.getItem('user_name'));
    // ?? not sure if this the best way to broadcast the status but seems to resolve issue on page refresh where auth status is lost in
    // header component resulting in authed user nav links disappearing despite the fact user is still logged in
    this._authNavStatusSource.next(this.loggedIn);
    this._currentUserEmail.next(this.username);
    this.baseUrl = configService.getApiURI();
    
  }

  register(email: string, password: string, firstName: string, lastName: string, team: string, isWikiUser: boolean, isWikiAdmin: boolean, isESDTeamMember: boolean, isESDTeamAdmin: boolean): Observable<UserRegistration> {
    let body = JSON.stringify({ email, password, firstName, lastName, team, isWikiUser, isWikiAdmin, isESDTeamMember, isESDTeamAdmin });
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.baseUrl + "/accounts", body, options)
      .pipe(map(res => res.json()));
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
        this._currentUserEmail.next(userName);

        this.isESDTeamAdmin();
        this.isESDTeamMember();
        this.isWikiAdmin();
        this.isWikiUser();

        return true;
      }));
  }

  logout() {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_name');
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
    let jwt = localStorage.getItem('auth_token')
    if (jwt != null) {
      let jwtData = jwt.split('.')[1]
      let decodedJwtJsonData = window.atob(jwtData)
      let decodedJwtData = JSON.parse(decodedJwtJsonData)
      let role = decodedJwtData.role
      console.log(role)
      if (role === 'WikiAdmin') {
        this._isWikiAdminSubject.next(true);
        return true
      } else return false
    } else return false
  }

  public isWikiUser(): boolean {
    let jwt = localStorage.getItem('auth_token')
    if (jwt != null) {
      let jwtData = jwt.split('.')[1]
      let decodedJwtJsonData = window.atob(jwtData)
      let decodedJwtData = JSON.parse(decodedJwtJsonData)
      let role = decodedJwtData.role
      console.log(role)
      if (role === 'WikiUser' || role === 'WikiAdmin' || role === 'ESDTeamMember' || role === 'ESDTeamAdmin') {
        this._isWikiUserSubject.next(true);
        return true
      } else return false
    } else return false
  }

  public isESDTeamMember(): boolean {
    let jwt = localStorage.getItem('auth_token')

    if (jwt != null) {
      let jwtData = jwt.split('.')[1]
      let decodedJwtJsonData = window.atob(jwtData)
      let decodedJwtData = JSON.parse(decodedJwtJsonData)
      let role = decodedJwtData.role
      console.log(role)
      if (role === 'ESDTeamMember' || role === 'ESDTeamAdmin' || role === 'WikiAdmin') {
        this._isESDTeamMemberSubject.next(true);
        return true
      } else return false
    } else return false
  }

  public isESDTeamAdmin(): boolean {
    let jwt = localStorage.getItem('auth_token')
    if (jwt != null) {
      let jwtData = jwt.split('.')[1]
      let decodedJwtJsonData = window.atob(jwtData)
      let decodedJwtData = JSON.parse(decodedJwtJsonData)
      let role = decodedJwtData.role
      console.log(role)
      if (role === 'ESDTeamAdmin' || role === 'WikiAdmin') {
        this._isESDTeamAdminSubject.next(true);
        return true
      } else return false
    } else return false
  }

  public getUserBySearchTerm(lastName: string, filter: string): Observable<boolean> {
    let params = new HttpParams();
    params = params.append('searchTerm', lastName);
    params = params.append('filter', filter);
    
    return this.httpClient.get(this.baseUrl + "/accounts", { params: params }).pipe(map((data: any[]) => {
      this.users = data;
      return true;
    }));
  }
}

