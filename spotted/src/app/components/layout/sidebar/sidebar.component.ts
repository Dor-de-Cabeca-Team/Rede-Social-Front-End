import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface User {
  username: string;
  picture: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  status: boolean = false;

  constructor(private router: Router) {}

  clickEvent() {
    this.status = !this.status;
  }

  isActive(path: string): boolean {
    const currentUrl = this.router.url;
    console.log('Current URL:', currentUrl);
    return currentUrl.toLowerCase() === path.toLowerCase();
  }

  user: User = {
    username: '@anonimo',
    picture: '../../../../assets/animals/Recurso3@2x.png'
  };
}
