import { Component } from '@angular/core';
import { FeedComponent } from '../feed/feed.component';
import { SidebarComponent } from "../sidebar/sidebar.component";

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [FeedComponent, SidebarComponent],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.scss'
})
export class PrincipalComponent {

}
