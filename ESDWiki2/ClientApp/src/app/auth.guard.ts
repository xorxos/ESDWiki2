// auth.guard.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from './shared/services/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private user: UserService,private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const destination: string = route.pathFromRoot[route.pathFromRoot.length - 1].url.toString()
    console.log("Destination: " + destination)

    if(!this.user.isLoggedIn())
    {
       this.router.navigate(['login']);
       return false;
    }

    switch (destination) {
      case 'team-wiki,create': {
        if (this.user.isESDTeamAdmin()) {
          console.log('I AM TEAM ADMIN')
          return true
        } else {
          this.router.navigate(['error/unauthorized'])
          return false
        }
      }
      case 'team-wiki': {
        if (this.user.isESDTeamMember()) {
          console.log("I am ignoring the admin rules")
          return true
        } else {
          console.log("Routing to login")
          this.router.navigate(['error/unauthorized'])
          return false
        }
      }
      default:
        return false
      
    }
  }
}
