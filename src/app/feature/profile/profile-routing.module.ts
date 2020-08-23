import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {DetailComponent} from "./detail/detail.component";
import {EditingComponent} from "./editing/editing.component";

const routes: Routes = [
  {path: "", component: DetailComponent},
  {
    path: "editing",
    component: EditingComponent
  },
  {path: "profile", component: DetailComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
