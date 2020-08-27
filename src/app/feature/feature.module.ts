import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatchModule} from "./match/match.module";
import {SharedModule} from "../shared/shared.module";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {ProfileModule} from "./profile/profile.module";

@NgModule({
	declarations: [
		DashboardComponent,
	],
	imports: [
		CommonModule, SharedModule
	],
	exports: [MatchModule,
		ProfileModule, DashboardComponent,
	]
})
export class FeatureModule {
}
