import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/auth.service';
import { Symptom } from 'src/app/entity/symptom';
import { environment } from 'src/environments/environment';

const API_URL: string = environment.apiUrl;

@Component({
  selector: 'app-health',
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.css']
})
export class HealthComponent implements OnInit {
  
  symptoms!: Array<Symptom>;

  constructor(public activeModal: NgbActiveModal,
    private http: HttpClient,
    private authService: AuthService) {
    
  }

  ngOnInit(): void {
    this.getSymptoms();
  }

  chooseSymptom(id: number) {
    this.symptoms.forEach(e => {
      if (e.id == id) {
        e.choosen = !e.choosen;
      }
    });
  }

  getSymptoms() {
    this.http.get<any>(API_URL + '/symptoms')
    .subscribe({
      error: this.handleError.bind(this),
      next: this.process.bind(this)
    });
  }

  handleError(error : HttpErrorResponse) {
    console.log("error");
  }

  process(symptoms : Array<Symptom>) {
    symptoms.forEach(e => {e.choosen = false;});
    this.symptoms = symptoms;

  }
}
