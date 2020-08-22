import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatchModule} from "./match/match.module";
import {LoginComponent} from "./login/login.component";
import {SharedModule} from "../shared/shared.module";
import {ProfileComponent} from "./profile/profile.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {SigninComponent} from "./signin/signin.component";

@NgModule({
    declarations: [
        LoginComponent, ProfileComponent, DashboardComponent,
        SigninComponent
    ],
    imports: [
        CommonModule, SharedModule
    ],
    exports: [MatchModule, ProfileComponent, LoginComponent, DashboardComponent,
        SigninComponent
    ]
})
export class FeatureModule {
}
