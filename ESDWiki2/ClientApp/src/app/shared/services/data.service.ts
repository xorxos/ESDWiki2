import { Injectable } from "@angular/core";
import { User } from "../user";
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";
import { UserService } from "./user.service";

@Injectable()

export class DataService {
  selectedUserToEdit: User

  constructor(private http: HttpClient, private user: UserService) { }

  private token: string = "";
  private tokenExpiration: Date;

  public get loginRequired(): boolean {
    return this.token.length == 0 || this.tokenExpiration > new Date();
  }

  login(creds): Observable<boolean> {
    return this.http
      .post("/api/auth/createtoken", creds)
      .pipe(
      map((data: any) => {
          this.token = data.token;
          localStorage.setItem("jwt", this.token)
          this.tokenExpiration = data.expiration;
          this.user.setAuthorizations();
          return true;
        }));
  }
}
