import {BrowserModule} from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SigninComponent} from './signin/signin.component';
import {ConfigService, configServiceInitializerFactory} from './services/config.service';
import {RequestHeadersInterceptorService} from "./core/html/interceptors/request-headers-interceptor.service";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatchDetailComponent} from './match/match-detail/match-detail.component';
import {MatchListComponent} from './match/match-list/match-list.component';
import {MatchCreationComponent} from './match/match-creation/match-creation.component';
import {TokenInterceptor} from "./core/auth/token.interceptor";
import {CoreModule} from "./core/core.module";
import {MatDatepickerModule} from "@angular/material/datepicker";

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		LoginComponent,
		DashboardComponent,
		SigninComponent,
		MatchDetailComponent,
		MatchListComponent,
		MatchCreationComponent
	],
	imports: [
		BrowserModule,
		HttpClientModule,
		AppRoutingModule,
		ReactiveFormsModule,
		BrowserAnimationsModule,
		MatSnackBarModule,
		CoreModule,
		MatDatepickerModule
	],
	providers: [
		ConfigService, {
			provide: APP_INITIALIZER,
			useFactory: configServiceInitializerFactory,
			deps: [ConfigService],
			multi: true
		},
		{provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 5000}},
		{provide: HTTP_INTERCEPTORS, useClass: RequestHeadersInterceptorService, multi: true},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenInterceptor,
			multi: true
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}
