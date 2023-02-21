import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as AppState from '../../app.state';
import { UserState } from './user.reducer';

export interface State extends AppState.State {
  user: UserState;
}


const getUserState = createFeatureSelector<UserState>('user');

export const getOffers = createSelector(
  getUserState,
  state => state.offers
);

export const getOffersError = createSelector(
  getUserState,
  state => state.offersError
);

export const getSubscriptions = createSelector(
  getUserState,
  state => state.subscriptions
);

export const getSubscriptionsError = createSelector(
  getUserState,
  state => state.subscriptionsError
);
