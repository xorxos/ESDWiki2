// auth.guard.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from './shared/services/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private user: UserService,private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const destination: string = route.pathFromRoot[route.pathFromRoot.length - 1].url[0].toString()
    console.log(destination)

    if(!this.user.isLoggedIn())
    {
       this.router.navigate(['login']);
       return false;
    }

    switch (destination) {
      case 'team-wiki': {
        if (this.user.isESDTeamMember()) {
          console.log("Route to team-wiki page?: True")
          return true
        } else {
          console.log("Routing to login")
          this.router.navigate(['login'])
          return false
        }
      }
      case 'team-wiki/create': {
        if (this.user.isESDTeamAdmin()) {
          return true
        } else {
          this.router.navigate(['login'])
          return false
        }
      }
      default:
        return false
      
    }
  }
}
