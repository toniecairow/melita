import { createAction, props } from '@ngrx/store';
import { ApiCredentials, User } from '../auth.reducer';

export const loginUser = createAction(
  '[AuthApi] LoginUser'
);

export const loginUserSuccess = createAction(
  '[AuthApi] LoginUser Success',
  props<{ user: User, apiCredentials: ApiCredentials }>()
);

export const loginUserFailure = createAction(
  '[AuthApi] LoginUser Failure',
  props<{ error: any }>()
);
