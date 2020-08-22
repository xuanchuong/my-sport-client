import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AppFooterComponent } from "./layout/app-footer/app-footer.component";
import { HeaderComponent } from "./layout/header/header.component";


@NgModule({
	declarations: [
		HeaderComponent,
		AppFooterComponent],
	imports: [
		SharedModule
	],
	exports: [
		HeaderComponent, 
		AppFooterComponent
	]
})
export class CoreModule {
}
