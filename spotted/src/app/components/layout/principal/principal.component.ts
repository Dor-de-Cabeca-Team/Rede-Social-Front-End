import { Component } from '@angular/core';
import { FeedComponent } from '../feed/feed.component';
import { SidebarComponent } from "../sidebar/sidebar.component";
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { TredingComponent } from "../treding/treding.component";

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [FeedComponent, SidebarComponent, MdbScrollspyModule, TredingComponent],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.scss',
})
export class PrincipalComponent {}
