import { Component, inject, OnInit } from '@angular/core';
import {LeftsidebarComponent} from '../leftsidebar/leftsidebar.component'
import { AuthService } from '../../core/service/auth.service';
import { UserService } from '../../core/service/user.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  
  showLeftSidebar = false;
  authService = inject(AuthService);
  userService = inject(UserService);

  isStudent = this.userService.isStudent();
  isTeacher = this.userService.isTeacher();
  isAdmin = this.userService.isAdmin();
  isLoggedIn = false;

  ngOnInit(): void {
    this.authService.currentUser.subscribe(log =>{
      this.isLoggedIn=log;
    })
  }

  onLeftSideBarClick(){
    this.showLeftSidebar = !this.showLeftSidebar;
  }
  logout() {
    this.authService.logout().subscribe();
  }
}
