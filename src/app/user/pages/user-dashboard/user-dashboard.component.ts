import { Component, OnInit } from "@angular/core";
import { Observable, takeWhile, tap, timer } from "rxjs";

import { Store } from "@ngrx/store";
import {
  getOffers,
  getOffersError,
  getSubscriptions,
  getSubscriptionsError,
  State,
} from "../../state";
import { UserPageActions } from "../../state/actions";
import { UserOffer, UserSubscription } from "../../state/user.reducer";

@Component({
  selector: "app-user-dashboard",
  templateUrl: "./user-dashboard.component.html",
  styleUrls: ["./user-dashboard.component.scss"],
})
export class UserDashboardComponent implements OnInit {
  offersError$: Observable<null | string> = new Observable();
  offers$: Observable<UserOffer[]> = new Observable();
  offersLoading = true;

  subscriptionsError$: Observable<null | string> = new Observable();
  subscriptions$: Observable<UserSubscription[]> = new Observable();
  subscriptionsLoading = true;

  timer$: Observable<number> = new Observable();
  buttonDisabled = false;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.store.dispatch(UserPageActions.loadOffers());
    this.offers$ = this.store
      .select(getOffers)
      .pipe(
        tap((data) =>
          data.length
            ? (this.offersLoading = false)
            : (this.offersLoading = true)
        )
      );
    this.offersError$ = this.store
      .select(getOffersError)
      .pipe(tap((error) => (this.offersLoading = false)));
  }

  getSubscriptions(offerId: number): void {
    this.store.dispatch(UserPageActions.loadSubscriptions({ offerId }));
    this.subscriptions$ = this.store
      .select(getSubscriptions)
      .pipe(
        tap((data) =>
          data.length
            ? (this.subscriptionsLoading = false)
            : (this.subscriptionsLoading = true)
        )
      );
    this.subscriptionsError$ = this.store
      .select(getSubscriptionsError)
      .pipe(tap((error) => (this.subscriptionsLoading = false)));
  }

  disableFetch() {
    this.buttonDisabled = true;
    this.offersLoading = true;
    this.store.dispatch(UserPageActions.loadOffers());
    this.timer$ = timer(0, 1000).pipe(
      takeWhile((t) => {
        if (t === 11) {
          this.buttonDisabled = false;
        }
        return t <= 11;
      })
    );
  }

  logout() {
    this.store.dispatch(UserPageActions.logoutUser());
  }
}
