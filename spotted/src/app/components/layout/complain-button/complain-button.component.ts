import { Component, Input, inject } from '@angular/core';
import { PostService } from '../../../services/post/post.service';
import { IdGlobalService } from '../../../services/user/login/id-global.service';
import { LoginService } from '../../../auth/login.service';

@Component({
  selector: 'app-complain-button',
  standalone: true,
  imports: [],
  templateUrl: './complain-button.component.html',
  styleUrls: ['./complain-button.component.scss'],
})
export class ComplainButtonComponent {
  @Input() postUuid!: string;
  @Input() commentUuid!: string;
  postService = inject(PostService);
  loginService = inject(LoginService);

  denunciarPost() {
    const userId = this.loginService.getIdUsuarioLogado();
    if (userId) {
      this.postService.denunciarPost(this.postUuid, userId).subscribe({
        next: (response) => {
          // console.log('Post reportado: ' + response);
          // Aqui você pode usar um componente de alerta
          alert('Post reportado com sucesso: ' + response);
        },
        error: (err) => {
          console.error('Error: ', err);
          alert(
            'Error: ' + (err.error?.error || 'Ocorreu um erro desconhecido')
          );
        },
      });
    } else {
      alert('Usuário não logado.');
    }
  }

  denunciarComment() {
    const userId = this.loginService.getIdUsuarioLogado();
    if (userId) {
      this.postService.denunciarComentario(this.commentUuid, userId).subscribe({
        next: (response) => {
          console.log('Comment reported: ' + response);
          // Aqui você pode usar um componente de alerta
          alert('Comment reported successfully: ' + response);
        },
        error: (err) => {
          console.error('Error: ', err);
          alert(
            'Error: ' + (err.error?.error || 'Ocorreu um erro desconhecido')
          );
        },
      });
    } else {
      alert('Usuário não logado.');
    }
  }

  denunciar() {
    if (this.postUuid) {
      this.denunciarPost();
    } else if (this.commentUuid) {
      this.denunciarComment();
    }
  }
}
