import { Component, Input, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { User } from 'src/app/entity/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

const API_URL: string = environment.apiUrl;

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class IndexComponent implements OnInit {
  
  @Input() user!: User;

  constructor(private http: HttpClient,
    private router: Router,
    private authService: AuthService) {

  }

  ngOnInit(): void {
    this.user = new User({});

    HeaderComponent.title = "Твоё здоровье";
    if (this.authService.isUserLoggedIn()) {
      this.router.navigate(['/menu']);
    }
  }

  login() {
    this.http.post<any>(API_URL + '/users/login', this.user)
    .subscribe({
      error: this.handleError.bind(this),
      next: this.process.bind(this)
    });
  }

  handleError(error : HttpErrorResponse) {
    console.log("error");
    this.user.password = "";
  }

  process(user : User) {
    sessionStorage.setItem('user', JSON.stringify(user));
    this.router.navigate(['/menu']);
  }
}
