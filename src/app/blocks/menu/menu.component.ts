import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProfileComponent } from '../profile/profile.component';
import { HealthComponent } from '../health/health.component';
import { DoctorsComponent } from '../doctors/doctors.component';
import { TreatComponent } from '../treat/treat.component';
import { AuthService } from 'src/app/auth.service';
import { User } from 'src/app/entity/user';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  
  user!: User;

  constructor(private modalService: NgbModal, 
    public auth: AuthService) {
    
  }

  ngOnInit(): void {
    this.user = AuthService.getCurrentUser();
    HeaderComponent.title = "Привет, " + this.user.roles[0].displayName + "!";
  }

  openProfileModal() {
    this.modalService.open(ProfileComponent, {fullscreen: true, scrollable: true});
  }

  openHealthModal() {
    this.modalService.open(HealthComponent, {fullscreen: true, scrollable: true});
  }

  openDoctorsModal() {
    this.modalService.open(DoctorsComponent, {fullscreen: true, scrollable: true});
  }

  openTreatModal() {
    this.modalService.open(TreatComponent, {fullscreen: true, scrollable: true});
  }

  logout() {
    this.auth.logOut();
  }
}
