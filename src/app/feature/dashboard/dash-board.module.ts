import {NgModule} from '@angular/core';
import {DashboardComponent} from "./dashboard.component";
import {MatchModule} from "../match/match.module";

@NgModule({
    declarations: [
        DashboardComponent,
    ],
    imports: [MatchModule],
    exports: [
        DashboardComponent,
    ]
})
export class DashBoardModule {
}
