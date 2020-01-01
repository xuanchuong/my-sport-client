import { Component, OnInit } from '@angular/core';
import {Match} from '../match/match';
import {MATCHES} from '../match/mock-matches';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  availableMatches = MATCHES;
  constructor() { }

  ngOnInit() {
  }

}
