import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {
    MatButtonModule, MatCardModule, MatDatepickerModule,
    MatDialogModule, MatFormFieldModule, MatIconModule, MatInputModule,
    MatNativeDateModule, MatProgressSpinnerModule, MatSelectModule,
    MatToolbarModule, MatTooltipModule
} from '@angular/material';
import {RouterModule} from '@angular/router';
import {MatGridListModule} from "@angular/material/grid-list";


@NgModule({
    declarations: [],
    imports: [
        // angular
        CommonModule,
        RouterModule,
        ReactiveFormsModule,

        // material
        MatToolbarModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatProgressSpinnerModule,
        MatGridListModule
    ],
    exports: [
        // angular
        CommonModule,
        RouterModule,
        ReactiveFormsModule,

        // material
        MatToolbarModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatInputModule,
        MatSelectModule,
        MatTooltipModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatProgressSpinnerModule,
        MatGridListModule

        // local
    ]
})
export class SharedModule {
}
