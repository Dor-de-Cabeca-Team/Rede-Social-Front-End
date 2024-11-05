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
  repeatPassword: string = '';
  nome: string = '';
  idade!: number;
  dataNascimento!: Date;
  termosAceitos: boolean = false;

  router = inject(Router);
  user: UserInterface | null = null;

  constructor(private userService: UserService) {}

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
  

  onLoginSubmit(event: Event): void {
    event.preventDefault();
    this.logar(this.email, this.senha);
  }

  logar(email: string, senha: string): void {
    this.userService.login(email, senha).subscribe(
      (user) => {
        this.user = user;
        localStorage.setItem('loggedUser', JSON.stringify(user));
        console.log('Usuário logado com sucesso', user);
        this.router.navigate(['/principal']);
      },
      (error) => {
        console.error('Erro ao fazer login', error);
        alert('Erro ao fazer login');
      }
    );
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
    event.preventDefault();

    console.log('Termos Aceitos:', this.termosAceitos);

    if (this.senha !== this.repeatPassword) {
      alert('As senhas não coincidem');
      return;
    }

    if (!this.termosAceitos) {
      alert('Você deve aceitar os termos.');
      return; 
    }

    // Calcular a idade a partir da data de nascimento
    this.idade = this.calcularIdade(this.dataNascimento);

    const newUser: UserInterface = {
      nome: this.nome,
      idade: this.idade,
      email: this.email,
      senha: this.senha,
      uuid: '',
      ativo: false,
    };

    this.userService.register(newUser).subscribe(
      (user) => {
        this.user = user;
        alert('Usuário registrado com sucesso');
        console.log('Usuário registrado:', user);

        this.limparFormulario();
      },
      (error) => {
        console.error('Erro ao registrar usuário', error);
        alert('Erro ao registrar usuário');
      }
    );
  }

  limparFormulario(){
    this.email = '';
    this.senha = '';
    this.repeatPassword = '';
    this.nome = '';
    this.dataNascimento = new Date(); 
    this.termosAceitos = false;
  }
}