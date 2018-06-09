import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(
    private _userService: UserService,
    private route: Router
  ) {

  }

  canActivate() {
    if ( this._userService.isLogged() ) {
      return true;
    } else {
      this.route.navigate(['/login']);
      return false;
    }
  }
}
