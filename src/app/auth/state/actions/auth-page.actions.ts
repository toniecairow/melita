import { createAction, props } from "@ngrx/store";
import { UserCredentials } from "../auth.reducer";

export const login = createAction(
  "[AuthPage] Login",
  props<{ userCredentials: UserCredentials }>()
);

export const loginSuccess = createAction(
  "[AuthPage] Login Success",
  props<{ data: any }>()
);

export const loginFailure = createAction(
  "[AuthPage] Login Failure",
  props<{ error: any }>()
);
