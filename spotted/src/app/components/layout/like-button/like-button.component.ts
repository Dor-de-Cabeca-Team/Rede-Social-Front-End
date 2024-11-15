import { Component, Input, inject } from '@angular/core';
import { PostService } from '../../../services/post/post.service';
import { IdGlobalService } from '../../../services/user/login/id-global.service';
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
      return; // Retorna caso o usuário não esteja logado
    }

    this.postService.likePost(this.postUuid, userId).subscribe({
      next: (response) => {
        this.isLiked = !this.isLiked; // Alterna o estado do like
        // console.log('Post liked: ' + response);
        alert('Like realizado ' + response);
      },
      error: (err) => {
        console.error('Error: ', err);
        // alert('Error: ' + err.error?.error || 'Ocorreu um erro desconhecido');
      },
    });
  }

  likeComment() {
    const userId = this.loginService.getIdUsuarioLogado();
    if (!userId) {
      alert('Usuário não logado.');
      return; // Retorna caso o usuário não esteja logado
    }

    this.postService.likeComment(this.commentUuid, userId).subscribe({
      next: (response) => {
        this.isLiked = !this.isLiked; // Alterna o estado do like
        console.log('Comment liked: ' + response);
        alert('Comment liked successfully: ' + response);
      },
      error: (err) => {
        console.error('Error: ', err);
        alert('Error: ' + err.error?.error || 'Ocorreu um erro desconhecido');
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
