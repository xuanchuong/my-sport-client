import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileRoutingModule } from "./profile-routing.module";


@NgModule({
	declarations: [],
	imports: [SharedModule, ProfileRoutingModule]
})
export class ProfileModule {}
