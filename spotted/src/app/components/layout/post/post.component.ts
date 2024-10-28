import { Component, Input, inject } from '@angular/core';
import { Post } from '../../../models/post/post';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PostService } from '../../../services/post/post.service';
import { Comment } from '../../../models/comment/comment';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  // vai receber os posts que são passados pelo findAll dentro do feed.component
  // por isso o @Input()
  @Input() post!: Post;

  postService = inject(PostService);
  isLiked: boolean = false;
  comments: Comment[] = [];

  userid = '468bc00f-8867-48bc-8bf0-64eba813e2d4'; // fixo por enquanto
  likePost() {
    this.postService.likePost(this.post.uuid, this.userid).subscribe({
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

  denunciarPost() {
    this.postService.denunciarPost(this.post.uuid, this.userid).subscribe({
      next: (response) => {
        console.log('Post reported: ' + response);
        alert('Post reported successfully: ' + response);
      },
      error: (err) => {
        console.error('Error: ', err);
        alert('Error: ' + err.error?.error || 'Ocorreu um erro desconhecido');
      },
    });
  }

  showComments() {
    this.postService.showComments(this.post.uuid).subscribe({
      next: (response) => {
        this.comments = response;
        console.log('Comments: ', this.comments);
        alert('Comments: ' + this.comments.map(comment => comment.conteudo).join(', '));
      },
      error: (err) => {
        console.error('Error: ', err);
        alert('Error: ' + err.error?.error || 'Ocorreu um erro desconhecido');
      },
    });
  }

}
