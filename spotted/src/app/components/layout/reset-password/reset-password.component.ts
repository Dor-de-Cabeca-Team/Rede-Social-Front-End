import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [MdbFormsModule, CommonModule, FormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent implements OnInit {
  novaSenha: string = '';
  confirmarNovaSenha: string = '';
  token: string = '';
  isLoading: boolean = false;
  mensagem: string = '';

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Captura o token da URL
    this.token = this.route.snapshot.queryParams['token'];
  }

  // Função para enviar a nova senha para o backend
  resetPassword() {
    if (this.novaSenha !== this.confirmarNovaSenha) {
      this.mensagem = 'As senhas não coincidem.';
      return;
    }

    if (this.novaSenha.length < 6) {
      this.mensagem = 'A senha deve ter pelo menos 6 caracteres.';
      return;
    }

    this.isLoading = true;
    this.userService.redefinirSenha(this.token, this.novaSenha).subscribe(
      (response) => {
        this.isLoading = false;
        this.mensagem = response;
        setTimeout(() => {
          this.router.navigate(['/login']); // Redireciona para a tela de login após sucesso
        }, 2000);
      },
      (error) => {
        this.isLoading = false;
        this.mensagem =
          'Erro ao redefinir a senha. Tente novamente mais tarde.';
      }
    );
  }
}
