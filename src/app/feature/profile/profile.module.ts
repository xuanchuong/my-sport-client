import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileRoutingModule } from "./profile-routing.module";
import {ProfileComponent} from "./component/profile.component";


@NgModule({
	declarations: [ProfileComponent],
	imports: [SharedModule, ProfileRoutingModule],
	exports: [ProfileComponent]
})
export class ProfileModule {}
