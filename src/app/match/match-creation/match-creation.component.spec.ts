import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchCreationComponent } from './match-creation.component';
import {ReactiveFormsModule} from "@angular/forms";

describe('MatchCreationComponent', () => {
	let component: MatchCreationComponent;
	let fixture: ComponentFixture<MatchCreationComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ MatchCreationComponent ],
			imports: [
				ReactiveFormsModule
			]
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
