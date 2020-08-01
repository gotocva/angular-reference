import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable({ providedIn: 'root' })
/**
 * @class AuthGuard
 * @description for protecting routers when user is not logged in
 */
export class AuthGuard implements CanActivate {
    
  /**
   * @constructor
   * @param {Router} router router object
   */
  constructor(private router: Router) { }

  /**
   * @method canActivate
   * @description method to check if router can render or not
   * @return {Boolean}
   */
  canActivate() {
    /**
   * if token exists return true else return false
   */
  }
}
