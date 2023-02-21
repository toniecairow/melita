import { createAction, props } from "@ngrx/store";

export const loadOffers = createAction("[UserPage] Load Offers");

export const loadSubscriptions = createAction(
  "[UserPage] Load Subscriptions",
  props<{ offerId: number }>()
);

export const logoutUser = createAction("[UserPage] Logout");
