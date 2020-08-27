import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './feature/dashboard/dashboard.component';
import {MatchDetailComponent} from "./feature/match/match-detail/match-detail.component";
import {MatchCreationComponent} from "./feature/match/match-creation/match-creation.component";

const routes: Routes = [
    {path: "home", component: DashboardComponent},
    {path: "", component: DashboardComponent},
    {
        path: "account",
        loadChildren: () => import('./feature/profile/profile.module').then(m => m.ProfileModule)
    },
    {path: "matches/:matchId", component: MatchDetailComponent},
    {path: "match/create", component: MatchCreationComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
