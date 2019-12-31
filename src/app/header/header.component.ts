import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  navigatorItems: String[] = [
    "home", "contact"
  ];

  selectedItem: String;
    
  constructor() { }

  ngOnInit() {
    this.selectedItem = this.navigatorItems[0];
  }

  onSelect(item: String): void {
    this.selectedItem = item;
  }
}
