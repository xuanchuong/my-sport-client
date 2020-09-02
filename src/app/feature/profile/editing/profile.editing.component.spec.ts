import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEditingComponent } from './profile.editing.component';
import {SharedModule} from '../../../shared/shared.module';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('EditingComponent', () => {
  let component: ProfileEditingComponent;
  let fixture: ComponentFixture<ProfileEditingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileEditingComponent ],
        imports: [SharedModule, RouterTestingModule, HttpClientTestingModule, BrowserAnimationsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileEditingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
