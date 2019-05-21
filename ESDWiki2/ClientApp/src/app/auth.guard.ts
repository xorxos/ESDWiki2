// auth.guard.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from './shared/services/user.service';
import { DataService } from './shared/services/data.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private user: UserService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const destination: string = state.url

    if(!this.user.isLoggedIn())
    {
       this.router.navigate(['login']);
       return false;
    }

    switch (destination) {
      case '/team-wiki/create': {
        if (this.user.isESDTeamAdmin()) {
          return true
        } else {
          this.router.navigate(['error/unauthorized'])
          return false
        }
      }
      case '/team-wiki': {
        if (this.user.isESDTeamMember()) {
          return true
        } else {
          this.router.navigate(['error/unauthorized'])
          return false
        }
      }
      case '/admin/dashboard': {
        if (this.user.isESDTeamAdmin()) {
          return true
        } else {
          this.router.navigate(['error/unauthorized'])
          return false
        }
      }
      case '/admin/users/new': {
        if (this.user.isESDTeamAdmin()) {
          return true
        } else {
          this.router.navigate(['error/unauthorized'])
          return false
        }
      }
      case '/admin/users': {
        if (this.user.isESDTeamAdmin()) {
          return true
        } else {
          this.router.navigate(['error/unauthorized'])
          return false
        }
      }
      case '/admin/users/edit': {
        if (this.user.isESDTeamAdmin()) {
          return true
        } else {
          this.router.navigate(['error/unauthorized'])
          return false
        }
      }
      case '/admin/users/permissions': {
        if (this.user.isESDTeamAdmin()) {
          return true
        } else {
          this.router.navigate(['error/unauthorized'])
          return false
        }
      }
      case '/admin/team/categories': {
        if (this.user.isESDTeamAdmin()) {
          return true
        } else {
          this.router.navigate(['error/unauthorized'])
          return false
        }
      }
      case '/admin/wiki/categories': {
        if (this.user.isWikiAdmin()) {
          return true
        } else {
          this.router.navigate(['error/unauthorized'])
          return false
        }
      }
      default:
        return false
      
    }
  }
}
