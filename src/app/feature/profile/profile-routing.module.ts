import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ProfileDetailComponent} from "./detail/profile.detail.component";
import {ProfileEditingComponent} from "./editing/profile.editing.component";
import {ResetpassComponent} from "./resetpass/resetpass.component";
import {LoginComponent} from "./login/login.component";
import {SigninComponent} from "./signin/signin.component";

const routes: Routes = [
	{path: "", component: ProfileDetailComponent},
	{
		path: "account/editing",
		component: ProfileEditingComponent
	},
	{path: "account/resetPass", component: ResetpassComponent},
	{path: "account/login", component: LoginComponent},
	{path: "account/signin", component: SigninComponent},
];

@NgModule({
	imports: [
		RouterModule.forChild(routes)
	],
	exports: [RouterModule]
})
export class ProfileRoutingModule {
}
