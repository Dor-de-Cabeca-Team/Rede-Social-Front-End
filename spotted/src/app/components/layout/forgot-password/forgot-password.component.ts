import { Component } from '@angular/core';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { UserService } from '../../../services/user/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [MdbFormsModule, CommonModule, FormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  email: string = ''; // Variável para armazenar o e-mail inserido
  mensagem: string = ''; // Mensagem de sucesso ou erro
  isLoading: boolean = false; // Controle de carregamento

  constructor(private userService: UserService) {}

  enviarSolicitacao() {
    if (!this.email) {
      this.mensagem = 'Por favor, insira um e-mail válido.';
      return;
    }

    this.isLoading = true;
    this.userService.solicitarRedefinicaoSenha(this.email).subscribe({
      next: (res) => {
        this.mensagem = res; // Exibe a mensagem de sucesso
        this.isLoading = false;
      },
      error: (err) => {
        this.mensagem = err.error || 'Erro ao solicitar redefinição de senha.';
        this.isLoading = false;
      },
    });
  }
}
