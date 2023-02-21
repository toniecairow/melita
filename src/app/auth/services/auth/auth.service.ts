import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { catchError, Observable, tap, throwError } from "rxjs";
import { UserCredentials } from "../../state/auth.reducer";
import { Router } from "@angular/router";
import { FormGroup } from "@angular/forms";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  backendUrl = "https://selfcare-service.test.melita.com/interview/backend/api";

  static isInvalidControl(formGroup: FormGroup, formControlName: string) {
    if (!formGroup && !formControlName) {
      return true;
    }
    return (
      formGroup.get(formControlName)?.invalid &&
      formGroup.get(formControlName)?.touched
    );
  }

  static getControlError(
    formGroup: FormGroup,
    formControlName: string,
    error: string
  ) {
    if (!formGroup && !formControlName && error) {
      return true;
    }
    return (
      formGroup.get(formControlName)?.invalid &&
      formGroup.get(formControlName)?.errors &&
      formGroup.get(formControlName)?.errors?.[error]
    );
  }

  static markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsTouched();

      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }

  static markFormGroupPristine(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach((control: any) => {
      control.markAsPristine();

      if (control.controls) {
        this.markFormGroupPristine(control);
      }
    });
  }

  constructor(private http: HttpClient, private router: Router) {}

  login({ username, password }: UserCredentials): Observable<any> {
    const params = new HttpParams();
    const headers = new HttpHeaders({
      "Content-Type": "application/json; charset=utf-8",
    });
    return this.http
      .post<any>(
        `${this.backendUrl}/login`,
        { username, password },
        { params, headers }
      )
      .pipe(
        tap(({ authToken }) =>
          localStorage.setItem("tokenData", JSON.stringify({ authToken }))
        ),
        tap(() => this.router.navigate(["/user"])),
        catchError(this.handleError)
      );
  }

  private handleError({ error }: { error: string }) {
    return throwError(error);
  }
}
