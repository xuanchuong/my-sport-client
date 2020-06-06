import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProfileComponent} from './profile/profile.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SigninComponent} from "./signin/signin.component";

const routes: Routes = [
  {path:"home", component:DashboardComponent},
  {path:"", component:DashboardComponent},
  {path: "contact", component:ProfileComponent},
  {path: "login", component:LoginComponent},
  {path: "signin", component: SigninComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
