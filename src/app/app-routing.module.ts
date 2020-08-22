import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './feature/login/login.component';
import {DashboardComponent} from './feature/dashboard/dashboard.component';
import {SigninComponent} from "./feature/signin/signin.component";
import {MatchDetailComponent} from "./feature/match/match-detail/match-detail.component";
import {MatchCreationComponent} from "./feature/match/match-creation/match-creation.component";
import {ProfileComponent} from "./feature/profile/profile.component";

const routes: Routes = [
    {path: "home", component: DashboardComponent},
    {path: "", component: DashboardComponent},
    {
        path: "account",
        component: ProfileComponent
    },
    {path: "login", component: LoginComponent},
    {path: "signin", component: SigninComponent},
    {path: "matches/:matchId", component: MatchDetailComponent},
    {path: "match/create", component: MatchCreationComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
