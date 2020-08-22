import {NgModule} from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {MatchCreationComponent} from "./match-creation/match-creation.component";
import {MatchDetailComponent} from "./match-detail/match-detail.component";
import {MatchListComponent} from "./match-list/match-list.component";


@NgModule({
    declarations: [
        MatchCreationComponent,
        MatchDetailComponent,
        MatchListComponent
    ],
    imports: [
        SharedModule
    ],
    exports: [
        MatchCreationComponent,
        MatchDetailComponent,
        MatchListComponent
    ]
})
export class MatchModule {
}
