import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

// material
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
// routing
import { AuthRoutingModule } from "./auth-routing.module";
// @ngrx
import { AuthEffects } from "./state/auth.effects";
import { authReducer } from "./state/auth.reducer";
// components
import { LoginComponent } from "./pages/login/login.component";

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    // material
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    // routing
    AuthRoutingModule,
    // @ngrx
    StoreModule.forFeature("auth", authReducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
})
export class AuthModule {}
