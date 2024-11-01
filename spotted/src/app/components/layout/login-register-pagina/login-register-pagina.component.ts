import { Component, inject } from '@angular/core';
import { LoginRegisterFormComponent } from "../forms/login-register-form/login-register-form.component";
import { FotterComponent } from '../fotter/fotter.component';


@Component({
  selector: 'app-login-register-pagina',
  standalone: true,
  imports: [LoginRegisterFormComponent, FotterComponent],
  templateUrl: './login-register-pagina.component.html',
  styleUrl: './login-register-pagina.component.scss'
})
export class LoginRegisterPaginaComponent {
}
