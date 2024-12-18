import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { inject } from '@angular/core';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  const auth = inject(AuthService)

  if (req.method == 'POST') {
    
    const token = auth.getToken();
    if (token) {
      const authReq = req.clone({
        headers: req.headers.append('Authorization', `Bearer ${token}`).append('Content-Type', 'application/json'),
      });  
      return next(authReq);
    }
  }

  return next(req);
};
