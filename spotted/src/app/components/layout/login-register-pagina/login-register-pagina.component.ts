import { Component } from '@angular/core';
import { LoginRegisterFormComponent } from "../forms/login-register-form/login-register-form.component";

@Component({
  selector: 'app-login-register-pagina',
  standalone: true,
  imports: [LoginRegisterFormComponent],
  templateUrl: './login-register-pagina.component.html',
  styleUrl: './login-register-pagina.component.scss'
})
export class LoginRegisterPaginaComponent {

}
