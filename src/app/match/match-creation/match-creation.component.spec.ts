import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchCreationComponent } from './match-creation.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {ConfigService} from "../../services/config.service";

describe('MatchCreationComponent', () => {
	let component: MatchCreationComponent;
	let fixture: ComponentFixture<MatchCreationComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ MatchCreationComponent ],
			imports: [
				ReactiveFormsModule, RouterTestingModule, HttpClientTestingModule
			],
			providers: [ConfigService]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(MatchCreationComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
