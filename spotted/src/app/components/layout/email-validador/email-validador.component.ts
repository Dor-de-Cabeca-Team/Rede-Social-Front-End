import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-email-validador',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './email-validador.component.html',
  styleUrl: './email-validador.component.scss',
})
export class EmailValidadorComponent implements OnInit {
  isLoading: boolean = true; // Mostra estado de carregamento
  isValid: boolean | null = null; // Armazena se a validação foi bem-sucedida
  errorMessage: string | null = null; // Mensagem de erro, caso falhe
  router = inject(Router);

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // Captura os parâmetros da URL
    const idUser = this.route.snapshot.queryParamMap.get('idUser');
    const hash = this.route.snapshot.queryParamMap.get('hash');

    // Verifica se os parâmetros existem
    if (idUser && hash) {
      this.validarEmail(idUser, hash);
    } else {
      this.isLoading = false;
      this.errorMessage = 'Parâmetros inválidos na URL.';
    }
  }

  validarEmail(idUser: string, hash: string): void {
    this.userService.validarConta(idUser, hash).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.isValid = true;
      },
      error: (error) => {
        this.isLoading = false;
        this.isValid = false;
        this.errorMessage =
          error.error || 'Ocorreu um erro ao validar o e-mail.';
      },
    });
  }

  login() {
    this.router.navigate(['/login']);
  }
}
