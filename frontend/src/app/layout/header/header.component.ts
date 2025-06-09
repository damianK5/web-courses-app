import { Component, inject } from '@angular/core';
import {LeftsidebarComponent} from '../leftsidebar/leftsidebar.component'
import { AuthService } from '../../core/service/auth.service';
import { UserService } from '../../core/service/user.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  showLeftSidebar = false;
  authService = inject(AuthService);
  userService = inject(UserService);

  isStudent = this.userService.isStudent();
  isTeacher = this.userService.isTeacher();
  isAdmin = this.userService.isAdmin();

  onLeftSideBarClick(){
    this.showLeftSidebar = !this.showLeftSidebar;
  }
  logout() {
    this.authService.logout().subscribe();
  }
}
