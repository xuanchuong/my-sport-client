import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {SettingRoutingModule} from "./setting-routing.module";
import {ProfileComponent} from "./profile/component/profile.component";

@NgModule({
	declarations: [ProfileComponent],
	imports: [CommonModule, SettingRoutingModule],
	exports: [ProfileComponent]
})
export class SettingModule {}
