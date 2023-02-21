import { ComponentFixture, TestBed } from "@angular/core/testing";

import { UserDashboardComponent } from "./user-dashboard.component";

import { provideMockStore } from "@ngrx/store/testing";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatToolbarModule } from "@angular/material/toolbar";

describe("UserDashboardComponent", () => {
  let component: UserDashboardComponent;
  let fixture: ComponentFixture<UserDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserDashboardComponent],
      imports: [
        MatIconModule,
        MatMenuModule,
        MatToolbarModule,
        MatCardModule,
        MatProgressBarModule,
      ],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
