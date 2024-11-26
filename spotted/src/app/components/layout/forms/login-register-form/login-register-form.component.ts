import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatNativeDateModule,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { UserInterface } from '../../../../models/user/interface/user-interface';
import { UserService } from '../../../../services/user/user.service';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../../../auth/login.service';
import { Login } from '../../../../auth/login';
import { UserRegister } from '../../../../models/user/interface/user-register';
import { CommonModule } from '@angular/common';

// Defina o formato da data fora da classe
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

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
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }, // Idioma em português
  ],
  templateUrl: './login-register-form.component.html',
  styleUrls: ['./login-register-form.component.scss'],
})
export class LoginRegisterFormComponent {
  email: string = '';
  senha: string = '';
  repeatPassword: string = '';
  nome: string = '';
  idade!: number;
  termosAceitos: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = '';

  router = inject(Router);
  loginService = inject(LoginService);
  login: Login = new Login();
  user: UserRegister | null = null;

  constructor(private userService: UserService) {}

  mandarParaEsqueciSenha() {
    this.router.navigate(['/forgot-password']);
  }

  onLoginSubmit(event: Event): void {
    event.preventDefault();
    this.logar();
  }

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
          case 403:
            this.errorMessage = 'Confirme seu e-mail para logar.';
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

  formattedDataNascimento: string = ''; // Armazena a string formatada
  dataNascimento: Date | null = null; // Armazena o objeto Date (se necessário)

  formatDate(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

    // Aplica a máscara no formato DD/MM/YYYY
    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    if (value.length > 5) {
      value = value.slice(0, 5) + '/' + value.slice(5, 9);
    }

    input.value = value; // Atualiza o valor no input
    this.formattedDataNascimento = value; // Atualiza o modelo com a string formatada

    // Valida e converte para Date
    const [day, month, year] = value.split('/').map(Number);
    if (day && month && year && year > 1900) {
      const parsedDate = new Date(year, month - 1, day);
      if (!isNaN(parsedDate.getTime())) {
        this.dataNascimento = parsedDate; // Armazena o objeto Date
      } else {
        this.dataNascimento = null; // Define como null se a data for inválida
      }
    } else {
      this.dataNascimento = null;
    }
  }

  calcularIdade(dataNascimento: Date | null): number {
    if (!dataNascimento) {
      // Retorna 0 ou outro valor padrão se dataNascimento for inválido
      return 0;
    }

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

    if (this.senha !== this.repeatPassword) {
      this.errorMessage = 'As senhas não coincidem';
      return;
    }

    if (!this.termosAceitos) {
      this.errorMessage = 'Você deve aceitar os termos.';
      return;
    }

    this.isLoading = true;
    this.idade = this.calcularIdade(this.dataNascimento);

    const newUser: UserRegister = {
      nome: this.nome,
      idade: this.idade,
      email: this.email,
      senha: this.senha,
    };

    this.userService.register(newUser).subscribe({
      next: (user) => {
        this.isLoading = false;
        this.user = user;
        alert('Usuário registrado com sucesso');
        this.limparFormulario();
      },
      error: (error) => {
        this.isLoading = false;
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
