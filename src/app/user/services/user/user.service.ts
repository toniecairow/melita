import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { catchError, map, Observable, tap, throwError } from "rxjs";
import { UserOffer, UserSubscription } from "../../state/user.reducer";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class UserService {
  backendUrl = "https://selfcare-service.test.melita.com/interview/backend/api";

  constructor(private http: HttpClient, private router: Router) {}

  getOffers(): Observable<UserOffer[]> {
    const params = new HttpParams();
    const headers = new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8",
    });
    return this.http
      .get<{ offers: UserOffer[] }>(`${this.backendUrl}/offers/`, {
        params,
        headers,
      })
      .pipe(
        tap(({ offers }) => console.log(JSON.stringify(offers))),
        map(({ offers }) =>
          offers.sort((a, b) =>
            new Date(b?.contractStartDate) < new Date(a?.contractStartDate)
              ? -1
              : 1
          )
        ),
        catchError(this.handleError)
      );
  }

  getSubscriptions(offerId: number): Observable<UserSubscription[]> {
    const params = new HttpParams();
    const headers = new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8",
    });
    return this.http
      .get<{ subscriptions: UserSubscription[] }>(
        `${this.backendUrl}/offers/${offerId}/subscriptions/`,
        { params, headers }
      )
      .pipe(
        tap(({ subscriptions }) => console.log(JSON.stringify(subscriptions))),
        map(({ subscriptions }) =>
          subscriptions.sort((a, b) => (b?.name < a?.name ? -1 : 1))
        ),
        catchError(this.handleError)
      );
  }

  logout(): Observable<UserSubscription[]> {
    const params = new HttpParams();
    const headers = new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8",
    });
    return this.http
      .get<UserSubscription[]>(`${this.backendUrl}/offers/logout/`, {
        params,
        headers,
      })
      .pipe(
        tap((data) => console.log(JSON.stringify(data))),
        tap(() => localStorage.removeItem("tokenData")),
        tap(() => this.router.navigate(["/"])),
        catchError(this.handleError)
      );
  }

  private handleError({ error }: { error: string }) {
    return throwError(error);
  }
}
