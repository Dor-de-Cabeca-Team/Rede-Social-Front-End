import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal'
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { User } from '../../../models/user/class/user';
import { LoginService } from '../../../auth/login.service';
import { UserService } from '../../../services/user/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal-user',
  standalone: true,
  imports: [MdbFormsModule, FormsModule],
  templateUrl: './modal-user.component.html',
  styleUrl: './modal-user.component.scss',
})
export class ModalUserComponent implements OnInit {
  user: User = new User(); // Model do usuário
  senhaAntiga: string = '';
  senhaNova: string = '';
  confirmSenhaNova: string = '';

  constructor(
    public modalRef: MdbModalRef<ModalUserComponent>,
    private userService: UserService,
    private loginService: LoginService
  ) {}

  ngOnInit() {
    const userId = this.loginService.getIdUsuarioLogado(); // Obter ID do token
    if (userId) {
      this.userService.getUserById(userId).subscribe({
        next: (response: User) => {
          this.user = response; // Preencher os dados do usuário
        },
        error: (err) => {
          console.error('Erro ao buscar usuário:', err);
        },
      });
    }
  }

  trocarSenha() {
    if (this.senhaNova !== this.confirmSenhaNova) {
      alert('A nova senha e a confirmação não coincidem.');
      return;
    }

    const userId = this.loginService.getIdUsuarioLogado();
    if (!userId) {
      alert('Usuário não está logado.');
      return;
    }

    this.userService
      .trocarSenha(userId, this.senhaAntiga, this.senhaNova)
      .subscribe({
        next: () => {
          alert('Senha trocada com sucesso!');
          this.modalRef.close();
        },
        error: (err) => {
          console.error('Erro ao trocar senha:', err);
          alert(err.error?.message || 'Erro ao trocar senha.');
        },
      });
  }
}