import { Component, Input, inject } from '@angular/core';
import { PostService } from '../../../services/post/post.service';

@Component({
  selector: 'app-complain-button',
  standalone: true,
  imports: [],
  templateUrl: './complain-button.component.html',
  styleUrl: './complain-button.component.scss'
})
export class ComplainButtonComponent {
  @Input() postUuid!: string;
  @Input() commentUuid!: string;
  postService = inject(PostService);

  userid = '88fc4171-c04e-4659-a8f3-073745701517'; // fixo por enquanto

  denunciarPost() {
    this.postService.denunciarPost(this.postUuid, this.userid).subscribe({
      next: (response) => {
        console.log('Post reportado: ' + response);
        alert('Post reportado com sucesso: ' + response);
      },
      error: (err) => {
        console.error('Error: ', err);
        alert('Error: ' + err.error?.error || 'Ocorreu um erro desconhecido');
      },
    });
  }

  denunciarComment() {
    this.postService.denunciarComentario(this.commentUuid, this.userid).subscribe({
      next: (response) => {
        console.log('Comment reported: ' + response);
        alert('Comment reported successfully: ' + response);
      },
      error: (err) => {
        console.error('Error: ', err);
        alert('Error: ' + err.error?.error || 'Ocorreu um erro desconhecido');
      },
    });
  }

  denunciar() {
    if (this.postUuid) {
      this.denunciarPost();
    } else if (this.commentUuid) {
      this.denunciarComment();
    }
  }
}
