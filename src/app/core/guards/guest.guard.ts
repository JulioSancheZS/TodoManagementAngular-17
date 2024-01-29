import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

export const guestGuard: CanActivateFn = (route, state) => {

  const tokenService = inject(TokenService)
  const router = inject(Router)

  tokenService.isAuthenticacion.subscribe({
    next: (value) => {
       if(value){
          router.navigate(['todo']) 
       }
    }
  })
  return true;
};
