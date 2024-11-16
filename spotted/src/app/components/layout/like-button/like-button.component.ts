import { Component, Input, inject } from '@angular/core';
import { PostService } from '../../../services/post/post.service';
import { LoginService } from '../../../auth/login.service';

@Component({
  selector: 'app-like-button',
  standalone: true,
  imports: [],
  templateUrl: './like-button.component.html',
  styleUrls: ['./like-button.component.scss'],
})
export class LikeButtonComponent {
  @Input() postUuid!: string;
  @Input() commentUuid!: string;
  @Input() likes: any[] = [];
  postService = inject(PostService);
  isLiked = false;
  loginService = inject(LoginService);

  likePost() {
    const userId = this.loginService.getIdUsuarioLogado();
    if (!userId) {
      alert('Usuário não logado.');
      return;
    }

    this.postService.likePost(this.postUuid, userId).subscribe({
      next: (response) => {
        this.isLiked = !this.isLiked; // Alterna o estado do like
        this.isLiked ? this.likes.push(userId) : this.likes.pop(); // Atualiza o contador de likes
        //alert('Like realizado com sucesso!');
      },
      error: (err) => {
        console.error('Erro: ', err);
      },
    });
  }

  likeComment() {
    const userId = this.loginService.getIdUsuarioLogado();
    if (!userId) {
      alert('Usuário não logado.');
      return;
    }

    this.postService.likeComment(this.commentUuid, userId).subscribe({
      next: (response) => {
        this.isLiked = !this.isLiked; // Alterna o estado do like
        this.isLiked ? this.likes.push(userId) : this.likes.pop(); // Atualiza o contador de likes
        //alert('Like no comentário realizado com sucesso!');
      },
      error: (err) => {
        console.error('Erro: ', err);
      },
    });
  }

  like() {
    if (this.postUuid) {
      this.likePost();
    } else if (this.commentUuid) {
      this.likeComment();
    }
  }
}
