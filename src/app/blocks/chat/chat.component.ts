import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/auth.service';
import { Chat } from 'src/app/entity/chat';
import { Message } from 'src/app/entity/message';
import { Symptom } from 'src/app/entity/symptom';
import { User } from 'src/app/entity/user';
import { environment } from 'src/environments/environment';

const API_URL: string = environment.apiUrl;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ChatComponent implements OnInit {

  @Input() symptoms!: Array<Symptom>;
  isInit: boolean = false;
  chat!: Chat;
  user!: User;

  constructor(private http: HttpClient,
    public activeModal: NgbActiveModal, 
    ) {
    
  }

  ngOnInit(): void {
    if (this.isInit) {
      this.getCurrentUser();
    }
  }

  generateText():string {
    if (this.symptoms == null || this.symptoms.length == 0) {
      return "Добрый день! Хочу обратиться с персональной консультацией!";
    } else {
      let formedMessage = "Добрый день! Хочу обратиться с консультацией! Симптомы заболевания: ";
      this.symptoms.forEach(e => {
        formedMessage += "[" + e.name + "] ";
      });
      return formedMessage;
    }
  }

  create() {
    let initMessage = new Message({});
    initMessage.sender = this.user;
    initMessage.text = this.generateText();

    let request = {
      message: initMessage,
      members: null
    };

    console.log(request);

    this.http.post<any>(API_URL + '/chat', request)
    .subscribe({
      error: this.handleError.bind(this),
      next: this.process.bind(this)
    });
  }

  handleError(error : HttpErrorResponse) {
    console.log("error");
  }

  process(chat: Chat) {
    this.chat = chat;
    console.log(chat);
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
    console.log(this.user);
    this.create();
  }
}
