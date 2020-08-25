import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProfileDetailComponent} from "./detail/profile.detail.component";
import {ProfileEditingComponent} from "./editing/profile.editing.component";
import {SharedModule} from "../../shared/shared.module";
import {ProfileRoutingModule} from "./profile-routing.module";



@NgModule({
  declarations: [ProfileDetailComponent, ProfileEditingComponent],
  imports: [
    CommonModule, SharedModule, ProfileRoutingModule,
  ]
})
export class ProfileModule { }
