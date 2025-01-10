import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {

  const auth = inject(AuthService)
  const vendorId = route.paramMap.get('id');

  return new Promise((resolve, reject) => {
    auth.getSession().then((isLoggedIn: any) => {
      if (isLoggedIn) {
        resolve(true)
        return
      }

      auth.logOut(Number(vendorId));
      resolve(false)
    });
  })
};

