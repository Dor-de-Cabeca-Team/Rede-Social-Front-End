import { Component, Input, inject } from '@angular/core';
import { PostService } from '../../../services/post/post.service';

@Component({
  selector: 'app-like-button',
  standalone: true,
  imports: [],
  templateUrl: './like-button.component.html',
  styleUrl: './like-button.component.scss'
})
export class LikeButtonComponent {
  @Input() postUuid!: string;
  @Input() commentUuid!: string;
  @Input() likes: any[] = [];
  postService = inject(PostService);
  isLiked = false;

  userid = '468bc00f-8867-48bc-8bf0-64eba813e2d4'; // fixo por enquanto

  likePost() {
    this.postService.likePost(this.postUuid, this.userid).subscribe({
      next: (response) => {
        this.isLiked = !this.isLiked;
        console.log('Post liked: ' + response); // Aqui a resposta será a string do backend
        alert('Post liked successfully: ' + response); // Exibe a string de sucesso
      },
      error: (err) => {
        console.error('Error: ', err);
        alert('Error: ' + err.error?.error || 'Ocorreu um erro desconhecido'); // Exibe erro, se houver
      },
    });
  }

  likeComment() {
    this.postService.likeComment(this.commentUuid, this.userid).subscribe({
      next: (response) => {
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
