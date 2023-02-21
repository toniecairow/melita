import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { Store } from "@ngrx/store";
import { AuthService } from "../../services/auth/auth.service";
import { State } from "../../state";
import { AuthPageActions } from "../../state/actions";
import { validEmail } from "../../validators/valid-email/valid-email";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  AuthService = AuthService;
  hide = true;

  form: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private store: Store<State>) {}

  ngOnInit() {
    this.initialiseForm();
  }

  initialiseForm() {
    this.form = this.formBuilder.group({
      username: ["", [Validators.required, validEmail()]],
      password: ["", [Validators.required]],
    });
  }

  login() {
    AuthService.markFormGroupTouched(this.form);
    if (this.form.valid) {
      this.store.dispatch(
        AuthPageActions.login({ userCredentials: this.form.value })
      );
    }
  }
}
