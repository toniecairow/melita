import { createReducer, on } from "@ngrx/store";
import { UserApiActions, UserPageActions } from "./actions";

export interface UserOffer {
  id: number;
  contractStartDate: string;
  contractEndDate: string;
  name: string;
}
export interface SubscriptionUsage {
  type: string;
  used: number;
  limit: number;
}

export interface UserSubscription {
  id: number;
  name: string;
  line: null | string;
  type: string;
  usage: SubscriptionUsage[];
}

export interface UserState {
  offers: UserOffer[];
  offersError: string | null;
  subscriptions: UserSubscription[];
  subscriptionsError: string | null;
  logoutError: string | null;
}

export const initialState: UserState = {
  offers: [],
  offersError: null,
  subscriptions: [],
  subscriptionsError: null,
  logoutError: null,
};

export const userReducer = createReducer<UserState>(
  initialState,
  on(UserApiActions.loadOffersSuccess, (state, action): UserState => {
    return {
      ...state,
      offers: action?.offers,
      offersError: null,
    };
  }),
  on(UserApiActions.loadOffersFailure, (state, action): UserState => {
    return {
      ...state,
      offers: [],
      offersError: action.error,
    };
  }),
  on(UserApiActions.loadSubscriptionsSuccess, (state, action): UserState => {
    return {
      ...state,
      subscriptions: action?.subscriptions,
      subscriptionsError: null,
    };
  }),
  on(UserApiActions.loadSubscriptionsFailure, (state, action): UserState => {
    console.log(action.error);
    return {
      ...state,
      subscriptions: [],
      subscriptionsError: action.error,
    };
  }),
  on(UserApiActions.logoutUserSuccess, (state, action): UserState => {
    return {
      ...state,
      logoutError: null,
    };
  }),
  on(UserApiActions.logoutUserFailure, (state, action): UserState => {
    return {
      ...state,
      logoutError: action?.error,
    };
  })
);
