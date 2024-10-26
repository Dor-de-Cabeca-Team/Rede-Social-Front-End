import { Routes } from '@angular/router';
import { PostComponent } from './components/layout/post/post.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: "home", component: PostComponent }
];
