import { Component, inject } from '@angular/core';
import { PostService } from '../../../services/post/post.service';
import { Post } from '../../../models/post/post';
import { PostComponent } from '../post/post.component';
import { CommentComponent } from '../comment/comment.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [PostComponent, CommentComponent, CommonModule],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss'
})
export class FeedComponent {
  postService = inject(PostService);
  posts: Post[] = [];
  selectedPostId: string | null = null;
  showModal: boolean = false;

  constructor() {
    this.findAll();
  }

  findAll() {
    this.postService.findAll().subscribe({
      next: (value) => {
        this.posts = value.map(post => {
          const randomImage = this.getRandomAnimalImage();
          return {
            ...post,
            imagem: randomImage.path,
            imagemNome: randomImage.name
          };
        });
      },
      error: (err) => {
        console.error('Error: ' + err);
        alert('Error: ' + err);
      },
    });
  }

  getRandomAnimalImage(): { name: string, path: string } {
    const images = [
      { name: 'Cachorro', path: 'assets/animals/Recurso37@2x.png' },
      { name: 'Borboleta', path: 'assets/animals/Recurso4@2x.png' },
      { name: 'Galo', path: 'assets/animals/Recurso36@2x.png' },
      { name: 'Coelho', path: 'assets/animals/Recurso6@2x.png' },
      { name: 'Porco', path: 'assets/animals/Recurso3@2x.png' },
      { name: 'Rinoceronte', path: 'assets/animals/Recurso35@2x.png' },
      { name: 'Águia', path: 'assets/animals/Recurso34@2x.png' },
      { name: 'Touro', path: 'assets/animals/Recurso33@2x.png' },
      { name: 'Cavalo', path: 'assets/animals/Recurso32@2x.png' },
      { name: 'Coiote', path: 'assets/animals/Recurso31@2x.png' },
      { name: 'Elefante', path: 'assets/animals/Recurso30@2x.png' },
      { name: 'Papagaio', path: 'assets/animals/Recurso29@2x.png' },
      { name: 'Tucano', path: 'assets/animals/Recurso28@2x.png' },
      { name: 'Gato', path: 'assets/animals/Recurso27@2x.png' },
      { name: 'Calau', path: 'assets/animals/Recurso26@2x.png' },
      { name: 'Pato', path: 'assets/animals/Recurso25@2x.png' },
      { name: 'Antílope', path: 'assets/animals/Recurso24@2x.png' },
      { name: 'Alce', path: 'assets/animals/Recurso23@2x.png' },
      { name: 'Ema', path: 'assets/animals/Recurso22@2x.png' },
      { name: 'Hipopótamo', path: 'assets/animals/Recurso21@2x.png' },
    ];

    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  }
}
