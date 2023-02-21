import { Injectable } from '@angular/core';
import { map, catchError, exhaustMap } from 'rxjs/operators';
import { of } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../services/auth/auth.service';
import { AuthApiActions, AuthPageActions } from './actions';



@Injectable()
export class AuthEffects {


  constructor(private actions$: Actions, private authService: AuthService) {}

  // authToken: d5f2f8f0-24b5-452a-90cb-7db0c9ae57f0

  login$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(AuthPageActions.login),
        exhaustMap(action => this.authService.login(action.userCredentials)
          .pipe(
            map(apiCredentials => AuthApiActions.loginUserSuccess({ user: {username: action.userCredentials.username}, apiCredentials })),
            catchError(({error}) => of(AuthApiActions.loginUserFailure({ ...error })))
          )
        )
      );
  });
}
