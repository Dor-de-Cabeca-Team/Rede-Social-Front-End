import { Routes } from '@angular/router';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { LoginRegisterPaginaComponent } from './components/layout/login-register-pagina/login-register-pagina.component';
import { MainComponent } from './components/layout/main/main.component';
import { AnimatedComponent } from './components/layout/animated/animated.component';
import { loginGuard } from './auth/login.guard';



export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: "login", component: LoginRegisterPaginaComponent },
  { path: "principal", component: PrincipalComponent, canActivate: [loginGuard] },
  { path: "main", component: MainComponent},
  { path: "animated", component: AnimatedComponent}
];
