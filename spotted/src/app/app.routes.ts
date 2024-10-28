import { Routes } from '@angular/router';
import { PrincipalComponent } from './components/layout/principal/principal.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: "home", component: PrincipalComponent }
];
