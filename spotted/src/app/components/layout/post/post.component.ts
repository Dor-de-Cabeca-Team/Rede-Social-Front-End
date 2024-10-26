import { Component, inject } from '@angular/core';
import { Post } from '../../../models/post';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PostService } from '../../../services/post.service';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent {
  postService = inject(PostService);
  posts: Post[] = [];

  constructor() {
    this.findAll();
    console.log(this.posts);
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
