import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { Chat } from 'src/app/entity/chat';
import { User } from 'src/app/entity/user';
import { environment } from 'src/environments/environment';
import { ChatComponent } from '../chat/chat.component';

const API_URL: string = environment.apiUrl;

@Component({
  selector: 'app-treat',
  templateUrl: './treat.component.html',
  styleUrls: ['./treat.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class TreatComponent implements OnInit {
  
  chats!: Array<Chat>;
  user!: User;

  constructor(private modalService: NgbModal, 
    private http: HttpClient,
    public activeModal: NgbActiveModal) {
    
  }

  ngOnInit(): void {
    this.getCurrentUser();
  }

  chat(chat : Chat) {
    const currentModal = this.modalService.open(ChatComponent, {fullscreen: true, scrollable: true, windowClass: 'chatModal'});
    currentModal.componentInstance.chat = chat;
    currentModal.componentInstance.isInit = false;
  }

  getChats() {
    this.http.get<any>(API_URL + '/chats?id='+this.user.id)
    .subscribe({
      error: this.handleError.bind(this),
      next: this.process.bind(this)
    });
  }

  handleError(error : HttpErrorResponse) {
    console.log(error.error);
  }

  process(chats : Array<Chat>) {
    this.chats = chats;
  }

  getCurrentUser() {
    this.http.get<any>(API_URL + '/users?id='+AuthService.getCurrentUser().id)
    .subscribe({
      error: this.handleError2.bind(this),
      next: this.process2.bind(this)
    });
  }

  handleError2(error : HttpErrorResponse) {
    console.log("error");
  }

  process2(user : User) {
    this.user = user;
    this.getChats();
  }
}
