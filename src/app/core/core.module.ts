import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeaderComponent} from "./layout/header/header.component";
import {AppFooterComponent} from "./layout/app-footer/app-footer.component";
import {RouterModule} from "@angular/router";



@NgModule({
  declarations: [HeaderComponent, AppFooterComponent],
  imports: [
    CommonModule, RouterModule
  ],
  exports: [HeaderComponent, AppFooterComponent, RouterModule]
})
export class CoreModule { }
