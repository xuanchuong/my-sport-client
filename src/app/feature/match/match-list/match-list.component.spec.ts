import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MatchListComponent} from './match-list.component';
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ConfigService} from "../../../services/config.service";
import {SharedModule} from "../../../shared/shared.module";

describe('MatchListComponent', () => {
  let component: MatchListComponent;
  let fixture: ComponentFixture<MatchListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchListComponent ],
      imports: [
        RouterTestingModule, HttpClientTestingModule, SharedModule
      ],
      providers: [ConfigService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
