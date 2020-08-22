import { HttpClientTestingModule } from "@angular/common/http/testing";
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { SharedModule } from 'src/app/shared/shared.module';
import { ConfigService } from "../../../services/config.service";
import { MatchCreationComponent } from './match-creation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('MatchCreationComponent', () => {
	let component: MatchCreationComponent;
	let fixture: ComponentFixture<MatchCreationComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ MatchCreationComponent ],
			imports: [
				SharedModule, RouterTestingModule, HttpClientTestingModule,
				BrowserAnimationsModule
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
