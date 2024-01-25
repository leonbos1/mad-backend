import { inject } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of, EMPTY, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IRouteStop } from '../route-stop.model';
import { RouteStopService } from '../service/route-stop.service';

export const routeStopResolve = (route: ActivatedRouteSnapshot): Observable<null | IRouteStop> => {
  const id = route.params['id'];
  if (id) {
    return inject(RouteStopService)
      .find(id)
      .pipe(
        mergeMap((routeStop: HttpResponse<IRouteStop>) => {
          if (routeStop.body) {
            return of(routeStop.body);
          } else {
            inject(Router).navigate(['404']);
            return EMPTY;
          }
        }),
      );
  }
  return of(null);
};

export default routeStopResolve;
