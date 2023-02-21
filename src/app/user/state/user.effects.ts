import { Injectable } from '@angular/core';
import { map, catchError, exhaustMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../services/user/user.service';
import { UserApiActions, UserPageActions } from './actions';



@Injectable()
export class UserEffects {


  constructor(private actions$: Actions, private userService: UserService) {}

  loadOffers$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(UserPageActions.loadOffers),
        exhaustMap(() => this.userService.getOffers()
          .pipe(
            map(offers => UserApiActions.loadOffersSuccess({ offers })),
            // catchError(({error}) => of(UserApiActions.loadOffersFailure({ ...error })))
          )
        )
      );
  });

  loadSubscriptions$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(UserPageActions.loadSubscriptions),
        exhaustMap(action => this.userService.getSubscriptions(action?.offerId)
          .pipe(
            map(subscriptions => UserApiActions.loadSubscriptionsSuccess({ subscriptions })),
            catchError(({error}) => of(UserApiActions.loadSubscriptionsFailure({ ...error })))
          )
        )
      );
  });

  logout$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(UserPageActions.logoutUser),
        exhaustMap(action => this.userService.logout()
          .pipe(
            map(data => UserApiActions.logoutUserSuccess({data})),
            catchError(({error}) => of(UserApiActions.logoutUserFailure({ ...error })))
          )
        )
      );
  });
}
