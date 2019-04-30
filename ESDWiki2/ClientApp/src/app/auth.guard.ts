// auth.guard.ts
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from './shared/services/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private user: UserService,private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const destination: string = route.pathFromRoot[route.pathFromRoot.length - 1].url[0].toString()

    if(!this.user.isLoggedIn())
    {
       this.router.navigate(['login']);
       return false;
    }

    return true;
  }
}
