import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileEditingComponent } from './profile.editing.component';

describe('EditingComponent', () => {
  let component: ProfileEditingComponent;
  let fixture: ComponentFixture<ProfileEditingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileEditingComponent ]
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
