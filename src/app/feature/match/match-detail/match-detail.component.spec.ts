import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MatchDetailComponent} from './match-detail.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {ReactiveFormsModule} from "@angular/forms";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCardModule} from "@angular/material/card";

describe('MatchDetailComponent', () => {
    let component: MatchDetailComponent;
    let fixture: ComponentFixture<MatchDetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [MatchDetailComponent],
            imports: [
                HttpClientTestingModule, RouterTestingModule, ReactiveFormsModule,
                MatGridListModule, MatCardModule
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MatchDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
