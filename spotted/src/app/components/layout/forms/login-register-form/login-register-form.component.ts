import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { UserInterface } from '../../../../models/user/interface/user-interface';
import { UserService } from '../../../../services/user/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-register-form',
  standalone: true,
  imports: [
    MdbFormsModule,
    MdbTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './login-register-form.component.html',
  styleUrls: ['./login-register-form.component.scss'],
})
export class LoginRegisterFormComponent {
  email: string = '';
  senha: string = '';

  router = inject(Router);

  user: UserInterface | null = null;

  constructor(private userService: UserService) {}

  onLoginSubmit(event: Event): void {
    event.preventDefault(); // Evita o reload da página
    this.logar(this.email, this.senha);
  }

  logar(email: string, senha: string): void {
    this.userService.login(email, senha).subscribe(
      (user) => {
        this.user = user; // Armazene as informações do usuário
        localStorage.setItem('loggedUser', JSON.stringify(user)); // Salve no localStorage para persistência
        console.log('Usuário logado com sucesso', user);
         this.router.navigate(['/principal']);
      },
      (error) => {
        console.error('Erro ao fazer login', error);
        alert('Erro ao fazer login');
      }
    );
  }
}