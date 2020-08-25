import {HttpClientTestingModule} from "@angular/common/http/testing";
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from "@angular/router/testing";
import {SharedModule} from 'src/app/shared/shared.module';
import {ProfileDetailComponent} from "./profile.detail.component";
import {AuthService} from "../../../core/auth/auth.service";
import {ConfigService} from "../../../services/config.service";
import {User} from "../../../core/auth/user";
import {BehaviorSubject} from "rxjs";

describe('ProfileComponent', () => {
  let component: ProfileDetailComponent;
  let fixture: ComponentFixture<ProfileDetailComponent>;
  let authService: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProfileDetailComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, SharedModule],
      providers: [ConfigService]
    }).compileComponents();
  }));

  beforeEach(() => {
    authService = TestBed.inject(AuthService);
    const loggedUser = new User();
    loggedUser.firstName = 'firstName';
    loggedUser.email = 'email';
    const loggedUser$ = new BehaviorSubject<User>(loggedUser);
    jest.spyOn(authService, 'getLoggedUser').mockReturnValue(loggedUser$);

    fixture = TestBed.createComponent(ProfileDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
