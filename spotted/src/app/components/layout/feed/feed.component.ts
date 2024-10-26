import { Component, inject } from '@angular/core';
import { PostService } from '../../../services/post/post.service';
import { Post } from '../../../models/post';
import { PostComponent } from '../post/post.component';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [PostComponent],
  templateUrl: './feed.component.html',
  styleUrl: './feed.component.scss'
})
export class FeedComponent {
  postService = inject(PostService);
  posts: Post[] = [];

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
      { name: 'Cachorro', path: 'assets/animals/ProfilePicture.png' },
      { name: 'Borboleta', path: 'assets/animals/ProfilePicture1.png' },
      { name: 'Galo', path: 'assets/animals/ProfilePicture2.png' },
      { name: 'Coelho', path: 'assets/animals/ProfilePicture3.png' },
    ];

    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
  }

}
