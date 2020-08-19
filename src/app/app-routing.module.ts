import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SigninComponent} from "./signin/signin.component";
import {MatchDetailComponent} from "./match/match-detail/match-detail.component";
import {MatchCreationComponent} from "./match/match-creation/match-creation.component";

const routes: Routes = [
	{path: "home", component: DashboardComponent},
	{path: "", component: DashboardComponent},
	{
	  path: "account",
      loadChildren: () => import('./modules/settings/setting.module').then(m => m.SettingModule)},
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
