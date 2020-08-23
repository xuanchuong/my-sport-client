import {HttpClientTestingModule} from "@angular/common/http/testing";
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from "@angular/router/testing";
import {SharedModule} from 'src/app/shared/shared.module';
import {DetailComponent} from "./detail.component";
import {AuthService} from "../../../core/auth/auth.service";
import {ConfigService} from "../../../services/config.service";
import {User} from "../../../core/auth/user";

describe('ProfileComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let authService: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailComponent],
      imports: [RouterTestingModule, HttpClientTestingModule, SharedModule],
      providers: [ConfigService]
    }).compileComponents();
  }));

  beforeEach(() => {
    authService = TestBed.inject(AuthService);
    const loggedUser = new User();
    loggedUser.firstName = 'firstName';
    loggedUser.email = 'email';
    jest.spyOn(authService, 'getLoggedUser').mockReturnValue(loggedUser);

    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
