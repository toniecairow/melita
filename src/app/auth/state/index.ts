import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as AppState from '../../app.state';
import { AuthState } from './auth.reducer';

export interface State extends AppState.State {
  auth: AuthState;
}


const getAuthState = createFeatureSelector<AuthState>('auth');

export const getUser = createSelector(
  getAuthState,
  state => state?.user
);

export const getApiCredentials = createSelector(
  getAuthState,
  state => state?.apiCredentials
);
