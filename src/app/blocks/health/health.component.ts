import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/auth.service';
import { Symptom } from 'src/app/entity/symptom';
import { environment } from 'src/environments/environment';
import { ChatComponent } from '../chat/chat.component';

const API_URL: string = environment.apiUrl;

@Component({
  selector: 'app-health',
  templateUrl: './health.component.html',
  styleUrls: ['./health.component.css']
})
export class HealthComponent implements OnInit {
  
  symptoms!: Array<Symptom>;

  constructor(private modalService: NgbModal, 
    public activeModal: NgbActiveModal,
    private http: HttpClient,
    private authService: AuthService) {
    
  }

  ngOnInit(): void {
    this.getSymptoms();
  }

  chat() {
    const currentModal = this.modalService.open(ChatComponent, {fullscreen: true, scrollable: true, windowClass: 'chatModal'});
    currentModal.componentInstance.symptoms = this.symptoms.filter(e => e.choosen);
    currentModal.componentInstance.isInit = true;
    this.activeModal.close();
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
