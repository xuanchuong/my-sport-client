import {NgModule} from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {MatchCreationComponent} from "./match-creation/match-creation.component";
import {MatchDetailComponent} from "./match-detail/match-detail.component";
import {MatchListComponent} from "./match-list/match-list.component";
import {
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule
} from "@angular-material-components/datetime-picker";
import {MatDatepickerModule} from "@angular/material/datepicker";


@NgModule({
    declarations: [
        MatchCreationComponent,
        MatchDetailComponent,
        MatchListComponent
    ],
    imports: [
        SharedModule,
        MatDatepickerModule,
        NgxMatTimepickerModule,
        NgxMatDatetimePickerModule,
        NgxMatNativeDateModule
    ],
    exports: [
        MatchCreationComponent,
        MatchDetailComponent,
        MatchListComponent
    ]
})
export class MatchModule {
}
