import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/entity/user';
import { environment } from 'src/environments/environment';
import { ChatComponent } from '../chat/chat.component';
import { AuthService } from 'src/app/auth.service';

const API_URL: string = environment.apiUrl;

@Component({
  selector: 'app-conf',
  templateUrl: './conf.component.html',
  styleUrls: ['./conf.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ConfComponent implements OnInit {
  
  user!: User;
  doctors!: Array<User>;
  selectedDocs: Array<User> = [];

  constructor(private modalService: NgbModal, 
    private http: HttpClient,
    public activeModal: NgbActiveModal) {
    
  }

  ngOnInit(): void {
    this.user = AuthService.getCurrentUser();
    this.getDoctors();
  }

  chat() {
    const currentModal = this.modalService.open(ChatComponent, {fullscreen: true, scrollable: true, windowClass: 'chatModal'});
    currentModal.componentInstance.isInit = true;
    currentModal.componentInstance.forUser = this.selectedDocs;
    this.activeModal.close();
  }

  getDoctors() {
    let req = '/users/doctors';
    let searchField = document.getElementById("searchField") as HTMLInputElement;
    if (searchField.value != null && searchField.value.trim().length != 0) {
      req += "?fts="+searchField.value;
    }
    this.http.get<any>(API_URL + req)
    .subscribe({
      error: this.handleError.bind(this),
      next: this.process.bind(this)
    });
  }

  handleError(error : HttpErrorResponse) {
    console.log("error");
  }

  process(doctors : Array<User>) {
    doctors = doctors.filter(e => e.id != this.user.id);
    this.selectedDocs.forEach(e => {
      doctors = doctors.filter(j => e.id != j.id);
    });
    doctors = doctors.filter(e => e.id != this.user.id);
    this.doctors = doctors;
  }

  chooseDoc(doc: User) {
    this.selectedDocs.push(doc);
    this.selectedDocs.forEach(e => {
      this.doctors = this.doctors.filter(j => e.id != j.id);
    });
  }

  deleteDoc(doc: User) {
    this.doctors.push(doc);
    this.doctors.forEach(e => {
      this.selectedDocs = this.selectedDocs.filter(j => e.id != j.id);
    });
  }
}
