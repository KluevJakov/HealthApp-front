import { CommonModule } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, interval } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { MessageToChat } from 'src/app/entity/MessageToChat';
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
  @Input() isInit: boolean = false;
  @Input() forUser!: Array<User>;
  @Input() chat!: Chat;
  user!: User;
  newMessage!: MessageToChat;
  subscription!: Subscription;

  constructor(private http: HttpClient,
    public activeModal: NgbActiveModal, 
    ) {
    
  }

  ngOnInit(): void {
    this.getCurrentUser();
    
    (document.getElementsByClassName("chatModal")[0]
    .getElementsByClassName('component-host-scrollable')[0] as HTMLElement)
    .style.height = '100%';

    this.newMessage = new MessageToChat({});
    this.newMessage.message = new Message({});

    this.subscription = interval(1000).subscribe(x => {
      if (this.http) {
        this.refreshChat();
      }
    });
  }

  refreshChat() {
    this.http.get<any>(API_URL + '/chats/'+this.chat.id, AuthService.getJwtHeaderJSON())
    .subscribe({
      next: this.process4.bind(this),
      error: this.handleError.bind(this)
    });
  }

  process4(chat : Chat) {
    this.chat = chat;
  }

  sendMessage() {
    this.newMessage.chatId = this.chat.id;
    this.newMessage.message.sender = this.user;
    this.http.post<any>(API_URL + '/chats/send', this.newMessage)
    .subscribe({
      error: this.handleError.bind(this),
      next: this.process3.bind(this)
    });
  }

  process3() {
    //сообщение сохранено на сервере
    this.newMessage = new MessageToChat({});
    this.newMessage.message = new Message({});
  }

  generateText():string {
    if (this.symptoms == null || this.symptoms.length == 0) {
      return "Добрый день! Начнём диалог!";
    } else {
      let formedMessage = "Добрый день! Хочу обратиться с консультацией! Симптомы заболевания: ";
      this.symptoms.forEach(e => {
        formedMessage += "[" + e.name + "] ";
      });
      return formedMessage;
    }
  }

  createForUser(member: Array<User>) {
    let initMessage = new Message({});
    initMessage.sender = this.user;
    initMessage.text = this.generateText();

    let initMembers: User[] = [];
    member.forEach(e => {
      initMembers.push(e);
    });

    let request = {
      message: initMessage,
      members: initMembers
    };

    this.http.post<any>(API_URL + '/chats', request)
    .subscribe({
      error: this.handleError.bind(this),
      next: this.process.bind(this)
    });
  }

  create() {
    let initMessage = new Message({});
    initMessage.sender = this.user;
    initMessage.text = this.generateText();

    let initMembers = [];

    let request = {
      message: initMessage,
      members: null
    };

    this.http.post<any>(API_URL + '/chats', request)
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
  }

  getCurrentUser() {
    this.http.get<any>(API_URL + '/users?id='+AuthService.getCurrentUser().id)
    .subscribe({
      error: this.handleError.bind(this),
      next: this.process2.bind(this)
    });
  }

  process2(user : User) {
    this.user = user;
    if (this.isInit) {
      if (this.forUser != null) {
        this.createForUser(this.forUser);
      } else {
        this.create();
      }
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
