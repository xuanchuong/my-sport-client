import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {APP_INITIALIZER, NgModule} from '@angular/core';
import {MAT_SNACK_BAR_DEFAULT_OPTIONS} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {TokenInterceptor} from "./core/auth/token.interceptor";
import {CoreModule} from "./core/core.module";
import {RequestHeadersInterceptorService} from "./core/html/interceptors/request-headers-interceptor.service";
import {ConfigService, configServiceInitializerFactory} from './services/config.service';
import {SharedModule} from './shared/shared.module';
import {FeatureModule} from "./feature/feature.module";


@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		// vendor
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		// local
		CoreModule,
		SharedModule,
		AppRoutingModule,
		FeatureModule
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
