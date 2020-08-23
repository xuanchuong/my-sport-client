import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatchModule} from "./match/match.module";
import {LoginComponent} from "./login/login.component";
import {SharedModule} from "../shared/shared.module";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {SigninComponent} from "./signin/signin.component";
import {ProfileModule} from "./profile/profile.module";

@NgModule({
    declarations: [
        LoginComponent, DashboardComponent,
        SigninComponent,
    ],
    imports: [
        CommonModule, SharedModule
    ],
    exports: [MatchModule,
        ProfileModule, LoginComponent, DashboardComponent,
        SigninComponent
    ]
})
export class FeatureModule {
}
