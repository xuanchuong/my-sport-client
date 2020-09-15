import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatchModule} from "./match/match.module";
import {SharedModule} from "../shared/shared.module";
import {ProfileModule} from "./profile/profile.module";
import {DashBoardModule} from "./dashboard/dash-board.module";

@NgModule({
	declarations: [],
	imports: [
	    CommonModule,
        SharedModule
	],
	exports: [
	    MatchModule,
		ProfileModule,
        DashBoardModule,
	]
})
export class FeatureModule {
}
