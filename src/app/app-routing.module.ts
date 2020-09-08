import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './feature/dashboard/dashboard.component';
import {MatchDetailComponent} from "./feature/match/match-detail/match-detail.component";
import {MatchCreationComponent} from "./feature/match/match-creation/match-creation.component";
import {AuthGuard} from "./core/auth/auth.guard";

const routes: Routes = [
    {path: "home", component: DashboardComponent},
    {path: "", component: DashboardComponent},
    {
        path: "account", loadChildren: () => import('./feature/profile/profile.module').then(m => m.ProfileModule),
        canActivate: [AuthGuard]
    },
    {path: "matches/:matchId", component: MatchDetailComponent, canActivate: [AuthGuard]},
    {path: "match/create", component: MatchCreationComponent, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
