import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  static title: string;

  constructor() {
    HeaderComponent.title = "Твоё здоровье";
  }

  get staticTitle() {
    return HeaderComponent.title;
  }

  ngOnInit(): void {
    
  }

}
