// login-register-pagina.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginRegisterFormComponent } from "../forms/login-register-form/login-register-form.component";
import { FotterComponent } from '../fotter/fotter.component';

@Component({
  selector: 'app-login-register-pagina',
  templateUrl: './login-register-pagina.component.html',
  styleUrls: ['./login-register-pagina.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    LoginRegisterFormComponent,
    FotterComponent
  ]
})
export class LoginRegisterPaginaComponent implements OnInit {
  isLoading = true;

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }
}