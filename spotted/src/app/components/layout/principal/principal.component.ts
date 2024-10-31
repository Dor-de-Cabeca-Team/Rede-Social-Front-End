import { Component } from '@angular/core';
import { FeedComponent } from '../feed/feed.component';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { TredingComponent } from "../trending/treding.component";
import { CreatePostComponent } from '../create-post/create-post.component';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [FeedComponent, SidebarComponent, MdbScrollspyModule, TredingComponent, CreatePostComponent],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.scss',
})
export class PrincipalComponent {}
