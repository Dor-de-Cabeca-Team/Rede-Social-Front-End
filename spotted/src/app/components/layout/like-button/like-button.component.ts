import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { PostService } from '../../../services/post/post.service';
import { LoginService } from '../../../auth/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-like-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './like-button.component.html',
  styleUrls: ['./like-button.component.scss'],
})
export class LikeButtonComponent {
  @Input() likeCount: number = 0;
  @Input() postUuid!: string;
  @Input() commentUuid!: string;
  @Input() likes: any[] = [];
  @Input() liked: boolean = false;
  postService = inject(PostService);
  loginService = inject(LoginService);
  private pendingLikeStatus: boolean = this.liked;

  @Output() likedChanged = new EventEmitter<boolean>();

likePost() {
  const userId = this.loginService.getIdUsuarioLogado();
  if (!userId) {
    alert('Usuário não logado.');
    return;
  }

  // Atualize o estado local antes de enviar a requisição
  this.liked = !this.liked;
  this.likeCount = this.liked ? this.likeCount + 1 : this.likeCount - 1;

  // Emitir a alteração do liked para o componente pai
  this.likedChanged.emit(this.liked);

  // Faça a requisição para o backend
  this.postService.likePost(this.postUuid, userId).subscribe({
    next: () => {
      console.log('Like atualizado com sucesso no backend');
    },
    error: (err) => {
      console.error('Erro ao dar like no post: ', err);
      alert('Erro ao dar like. Tente novamente.');

      // Reverte as mudanças locais caso haja erro
      this.liked = !this.liked;
      this.likeCount = this.liked ? this.likeCount + 1 : this.likeCount - 1;
      this.likedChanged.emit(this.liked);
    }
  });
}



  likeComment() {
    const userId = this.loginService.getIdUsuarioLogado();
    if (!userId) {
      alert('Usuário não logado.');
      return;
    }

    console.log(this.commentUuid)
    this.toggleLike(userId);
    this.likeCount = this.liked ? this.likeCount + 1 : this.likeCount - 1;

    this.postService.likeComment(this.commentUuid, userId).subscribe({
      next: (response) => {
        this.pendingLikeStatus = this.liked;
      },
      error: (err) => {
        console.error('Erro ao dar like no comentário: ', err);
      }
    });
  }

  toggleLike(userId: string) {
    this.liked = !this.liked;
    if (this.liked) {
      this.likes.push(userId);
    } else {
      const index = this.likes.indexOf(userId);
      if (index > -1) {
        this.likes.splice(index, 1);
      }
    }
  }

  like() {
    if (this.postUuid) {
      this.likePost();
    } else if (this.commentUuid) {
      this.likeComment();
    }
  }
}
