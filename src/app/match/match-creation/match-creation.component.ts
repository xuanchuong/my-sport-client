import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-match-creation',
    templateUrl: './match-creation.component.html',
    styleUrls: ['./match-creation.component.scss']
})
export class MatchCreationComponent implements OnInit {
    form: FormGroup;

    constructor() { }

    ngOnInit() {
        this.form = new FormGroup({
            title: new FormControl('',Validators.required),
            startDate: new FormControl('', [Validators.required]),
            location: new FormControl('', [Validators.required]),
            description: new FormControl('', [Validators.required]),
            numberOfPlayers: new FormControl('', [Validators.min(5)]),
        })
    }

    onSubmit() {

    }
}
