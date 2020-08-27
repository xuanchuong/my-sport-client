import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ProfileDetailComponent} from "./detail/profile.detail.component";
import {ProfileEditingComponent} from "./editing/profile.editing.component";
import {SharedModule} from "../../shared/shared.module";
import {ProfileRoutingModule} from "./profile-routing.module";
import {ResetpassComponent} from "./resetpass/resetpass.component";
import {LoginComponent} from "./login/login.component";
import {SigninComponent} from "./signin/signin.component";


@NgModule({
	declarations: [ProfileDetailComponent, ProfileEditingComponent, ResetpassComponent, LoginComponent,
	SigninComponent],
	imports: [
		CommonModule, SharedModule, ProfileRoutingModule,
	]
})
export class ProfileModule {
}
