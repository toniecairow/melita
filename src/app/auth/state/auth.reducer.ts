import { createReducer, on } from "@ngrx/store";
import { AuthApiActions } from "./actions";

export interface User {
  username: string | null;
}

export interface UserCredentials extends User {
  password: null | string;
}

export interface ApiCredentials {
  authToken: string | null;
}

export interface AuthState {
  user: User | null;
  apiCredentials: ApiCredentials | null;
  loginError: string | null;
}

export const initialState: AuthState = {
  user: localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData") || JSON.stringify({}))
    : null,
  apiCredentials: localStorage.getItem("tokenData")
    ? JSON.parse(localStorage.getItem("tokenData") || JSON.stringify({}))
    : null,
  loginError: null,
};

console.log(initialState);

export const authReducer = createReducer<AuthState>(
  initialState,
  on(AuthApiActions.loginUserSuccess, (state, action): AuthState => {
    return {
      ...state,
      user: { ...state?.user, ...action?.user },
      loginError: null,
    };
  }),
  on(AuthApiActions.loginUserFailure, (state, action): AuthState => {
    return {
      ...state,
      loginError: action?.error,
    };
  })
);
