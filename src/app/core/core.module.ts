import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from "./layout/header/header.component";
import {AppFooterComponent} from "./layout/app-footer/app-footer.component";
import {RouterModule} from "@angular/router";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";


@NgModule({
	declarations: [HeaderComponent, AppFooterComponent],
	imports: [
		CommonModule, RouterModule,
		MatToolbarModule,
		MatCardModule,
		MatInputModule,
		MatFormFieldModule,
		MatButtonModule
	],
	exports: [HeaderComponent, AppFooterComponent, RouterModule]
})
export class CoreModule {
}
