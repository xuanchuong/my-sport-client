import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatchModule} from "./match/match.module";
import {ProfileModule} from "./profile/profile.module";

@NgModule({
    declarations: [],
    imports: [
        CommonModule
    ],
    exports: [MatchModule, ProfileModule]
})
export class FeatureModule {
}
