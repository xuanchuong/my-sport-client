import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ProfileDetailComponent} from "./detail/profile.detail.component";
import {ProfileEditingComponent} from "./editing/profile.editing.component";

const routes: Routes = [
  {path: "", component: ProfileDetailComponent},
  {
    path: "profile/editing",
    component: ProfileEditingComponent
  },
  {path: "profile", component: ProfileDetailComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
