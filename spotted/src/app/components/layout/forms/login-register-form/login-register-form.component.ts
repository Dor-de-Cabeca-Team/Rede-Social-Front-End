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
import { LoginService } from '../../../../auth/login.service';
import { Login } from '../../../../auth/login';
import { UserRegister } from '../../../../models/user/interface/user-register';
import { CommonModule } from '@angular/common';

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
    CommonModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './login-register-form.component.html',
  styleUrls: ['./login-register-form.component.scss'],
})
export class LoginRegisterFormComponent {
  email: string = '';
  senha: string = '';
  repeatPassword: string = '';
  nome: string = '';
  idade!: number;
  dataNascimento!: Date;
  termosAceitos: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';

  router = inject(Router);
  loginService = inject(LoginService);
  login: Login = new Login();
  user: UserRegister | null = null;

  constructor(private userService: UserService) {}

  onLoginSubmit(event: Event): void {
    event.preventDefault();
    this.logar();
  }

  //PARTE DO LOGIN!!

  logar() {
    this.isLoading = true;
    this.errorMessage = '';

    this.loginService.logar(this.login).subscribe({
      next: (token) => {
        this.isLoading = false; // Garantir que pare o carregamento
        if (token) {
          this.loginService.addToken(token);
          this.router.navigate(['/principal']);
        }
      },
      error: (erro) => {
        this.isLoading = false; // Garantir que pare o carregamento em caso de erro
        switch (erro.status) {
          case 401:
            this.errorMessage = 'Email ou senha incorretos.';
            break;
          case 500:
            this.errorMessage =
              'Erro interno no servidor. Por favor, tente novamente.';
            break;
          default:
            this.errorMessage = 'Erro inesperado. Tente novamente.';
        }
      },
    });
  }

  //PARTE DE REGISTRAR!!

  formatDate(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    if (value.length >= 5) {
      value = value.slice(0, 5) + '/' + value.slice(5);
    }

    input.value = value;
  }

  calcularIdade(dataNascimento: Date): number {
    const hoje = new Date();
    let idade = hoje.getFullYear() - dataNascimento.getFullYear();
    const mes = hoje.getMonth() - dataNascimento.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < dataNascimento.getDate())) {
      idade--;
    }
    return idade;
  }

  onRegisterSubmit(event: Event): void {
    this.errorMessage = '';
    event.preventDefault();

    //console.log('Termos Aceitos:', this.termosAceitos);

    if (this.senha !== this.repeatPassword) {
      this.errorMessage = 'As senhas não coincidem';
      //alert('As senhas não coincidem');
      return;
    }

    if (!this.termosAceitos) {
      this.errorMessage = 'As senhas não coincidem';
      //alert('Você deve aceitar os termos.');
      return;
    }

    this.isLoading = true; // Ativar carregamento
    this.idade = this.calcularIdade(this.dataNascimento);

    const newUser: UserRegister = {
      nome: this.nome,
      idade: this.idade,
      email: this.email,
      senha: this.senha,
    };

    this.userService.register(newUser).subscribe({
      next: (user) => {
        this.isLoading = false; // Garantir que pare o carregamento
        this.user = user;
        alert('Usuário registrado com sucesso');
        console.log('Usuário registrado:', user);
        this.limparFormulario();
      },
      error: (error) => {
        this.isLoading = false; // Garantir que pare o carregamento em caso de erro
        console.error('Erro ao registrar usuário', error);
        
        if (
          error.status === 400 &&
          error.error === 'Email ja esta sendo usado'
        ) {
          this.errorMessage = 'Este email já está em uso. Tente outro.';
        } else {
          this.errorMessage = 'Erro ao registrar usuário';
        }
      },
    });
  }

  limparFormulario() {
    this.email = '';
    this.senha = '';
    this.repeatPassword = '';
    this.nome = '';
    this.dataNascimento = new Date();
    this.termosAceitos = false;
  }
}
