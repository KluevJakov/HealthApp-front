import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/entity/user';
import { environment } from 'src/environments/environment';

const API_URL: string = environment.apiUrl;

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class DoctorsComponent implements OnInit {
  
  doctors!: Array<User>;

  constructor(private http: HttpClient,
    public activeModal: NgbActiveModal, 
    ) {
    
  }

  ngOnInit(): void {
    this.getDoctors();
  }

  getDoctors() {
    this.http.get<any>(API_URL + '/users/doctors')
    .subscribe({
      error: this.handleError.bind(this),
      next: this.process.bind(this)
    });
  }

  handleError(error : HttpErrorResponse) {
    console.log("error");
  }

  process(doctors : Array<User>) {
    this.doctors = doctors;
  }
}
