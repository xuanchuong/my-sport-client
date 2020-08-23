import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DetailComponent} from "./detail/detail.component";
import {EditingComponent} from "./editing/editing.component";
import {SharedModule} from "../../shared/shared.module";
import {ProfileRoutingModule} from "./profile-routing.module";



@NgModule({
  declarations: [DetailComponent, EditingComponent],
  imports: [
    CommonModule, SharedModule, ProfileRoutingModule,
  ]
})
export class ProfileModule { }
