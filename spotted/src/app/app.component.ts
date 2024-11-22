import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PostComponent } from './components/layout/post/post.component';
import { SidebarComponent } from "./components/layout/sidebar/sidebar.component";
import { SpinnerComponent } from "./components/layout/spinner/spinner.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    PostComponent, 
    SidebarComponent, 
    SpinnerComponent  
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'spotted';
}