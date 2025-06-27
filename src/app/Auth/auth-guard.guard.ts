import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthServiceService } from '../Services/auth-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardGuard implements CanActivate {
  constructor(private _auth: AuthServiceService, private _router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const allowedRole = route.data['role'];
    const token = this._auth.getToken();
    const userRole = this._auth.getRole();
    const targetUrl = state.url;

    if (!token) {
      this._router.navigate(['/']);
      return false;
    }

    if (allowedRole && !allowedRole.includes(userRole)) {
      console.log(state);

      alert('unauthorised');
      return false;
    }

    return true;
  }
}
