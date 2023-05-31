import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-treat',
  templateUrl: './treat.component.html',
  styleUrls: ['./treat.component.css']
})
export class TreatComponent implements OnInit {
  
  constructor(public activeModal: NgbActiveModal) {
    
  }

  ngOnInit(): void {
  }

}
