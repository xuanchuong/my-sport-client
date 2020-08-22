import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatchModule} from "./match/match.module";
import {LoginComponent} from "./login/login.component";
import {SharedModule} from "../shared/shared.module";
import {ProfileComponent} from "./profile/profile.component";

@NgModule({
    declarations: [LoginComponent, ProfileComponent],
    imports: [
        CommonModule, SharedModule
    ],
    exports: [MatchModule, ProfileComponent, LoginComponent]
})
export class FeatureModule {
}
