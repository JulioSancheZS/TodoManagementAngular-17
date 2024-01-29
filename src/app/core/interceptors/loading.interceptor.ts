import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { finalize } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {

  const loaderService = inject(LoaderService)

  loaderService.setLoading(true)
  return next(req).pipe(
    finalize(() => {
       loaderService.setLoading(false)
    })
  );
  
  // this.loadingService.setLoading(true);
  //   return next.handle(request).pipe(
  //     finalize(() => {
  //       this.totalRequests--;
  //       if (this.totalRequests == 0) {
  //         this.loadingService.setLoading(false);
  //       }
  //     })
};
