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
  @Input() likeCount: number = 0;
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
        this.isLiked = !this.isLiked; 
        this.isLiked ? this.likes.push(userId) : this.likes.pop(); 
        
        this.toggleLike(userId);
      },
      error: (err) => {
        console.error('Erro ao dar like no post: ', err);
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
         this.isLiked = !this.isLiked;
        this.isLiked ? this.likes.push(userId) : this.likes.pop();
        //alert('Like no comentário realizado com sucesso!');

        this.toggleLike(userId);
      },
      error: (err) => {
        console.error('Erro ao dar like no comentário: ', err);
      },
    });
  }

  toggleLike(userId: string) {
    this.isLiked = !this.isLiked;
    if (this.isLiked) {
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
