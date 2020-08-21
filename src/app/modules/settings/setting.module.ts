import {NgModule} from '@angular/core';
import {SettingRoutingModule} from "./setting-routing.module";
import {ProfileComponent} from "./profile/component/profile.component";
import {CoreModule} from "../../core/core.module";
import {CommonModule} from "@angular/common";

@NgModule({
	declarations: [ProfileComponent],
	imports: [SettingRoutingModule, CoreModule, CommonModule],
	exports: [ProfileComponent]
})
export class SettingModule {}
