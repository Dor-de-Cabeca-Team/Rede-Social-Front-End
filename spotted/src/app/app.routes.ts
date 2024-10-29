import { Routes } from '@angular/router';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { LoginRegisterPaginaComponent } from './components/layout/login-register-pagina/login-register-pagina.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: "login", component: LoginRegisterPaginaComponent }
];
