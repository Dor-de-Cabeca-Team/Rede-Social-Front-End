import { Component, Input, inject } from '@angular/core';
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
  private isPending: boolean = false;

  likePost() {
    const userId = this.loginService.getIdUsuarioLogado();
    if (!userId) {
      alert('Usuário não logado.');
      return;
    }

    if (this.isPending) return; //tudo que usa isso é para tentar fazer com que ele pegue a última ação feita
  
    this.toggleLike(userId);
    this.likeCount = this.liked ? this.likeCount + 1 : this.likeCount - 1;
  
    setTimeout(() => {
      this.postService.likePost(this.postUuid, userId).subscribe({
        next: (response) => {
          console.log
          this.pendingLikeStatus = this.liked;
        },
        error: (err) => {
          console.error('Erro ao dar like no post: ', err);
        },
        complete: () => {
          this.isPending = false;
        }
      });
    }, 0);
  }
  
  
  
  likeComment() {
    const userId = this.loginService.getIdUsuarioLogado();
    if (!userId) {
      alert('Usuário não logado.');
      return;
    }
  
    this.postService.likeComment(this.commentUuid, userId).subscribe({
      next: (response) => {
        this.liked = !this.liked;
        this.liked ? this.likes.push(userId) : this.likes.pop();
        this.toggleLike(userId);
      },
      error: (err) => {
        console.error('Erro ao dar like no comentário: ', err);
      },
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
