import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProfileComponent} from "./component/profile.component";
import {ProfileRoutingModule} from "./profile-routing.module";


@NgModule({
	declarations: [ProfileComponent],
	imports: [CommonModule, ProfileRoutingModule]
})
export class ProfileModule {}
