import { createAction, props } from "@ngrx/store";
import { UserOffer, UserSubscription } from "../user.reducer";

export const loadOffersSuccess = createAction(
  "[UserApi] Load Offers Success",
  props<{ offers: UserOffer[] }>()
);

export const loadOffersFailure = createAction(
  "[UserApi] Load Offers Fail",
  props<{ error: string }>()
);

export const loadSubscriptionsSuccess = createAction(
  "[UserApi] Load Subscriptions Success",
  props<{ subscriptions: UserSubscription[] }>()
);

export const loadSubscriptionsFailure = createAction(
  "[UserApi] Load Subscriptions Fail",
  props<{ error: string }>()
);

export const logoutUserSuccess = createAction(
  "[UserPage] Logout Success",
  props<{ data: any }>()
);

export const logoutUserFailure = createAction(
  "[UserPage] Logout Failure",
  props<{ error: any }>()
);
