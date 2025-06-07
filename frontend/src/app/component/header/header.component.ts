import { Component } from '@angular/core';
import {LeftsidebarComponent} from '../leftsidebar/leftsidebar.component'

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  showLeftSidebar = false;
  onLeftSideBarClick(){
    this.showLeftSidebar = !this.showLeftSidebar;
  }

}
