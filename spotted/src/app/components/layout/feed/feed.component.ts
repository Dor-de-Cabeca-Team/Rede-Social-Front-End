import { Component, inject } from '@angular/core';
import { PostService } from '../../../services/post/post.service';
import { PostDTO } from '../../../models/postDTO/post-dto';
import { PostComponent } from '../post/post.component';
import { CommentComponent } from '../comment/comment.component';
import { CommonModule } from '@angular/common';
import { CreatePostComponent } from "../create-post/create-post.component";
import { Router } from '@angular/router';
import { LoginService } from '../../../auth/login.service';
import { CommentDto } from '../../../models/commentDTO/comment-dto';

@Component({
  selector: 'app-feed',
  standalone: true,
  imports: [PostComponent, CommentComponent, CommonModule, CreatePostComponent],
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent {
  router = inject(Router);
  postService = inject(PostService);
  posts: PostDTO[] = [];
  selectedPostId: string | null = null;
  showModal: boolean = false;

  loginService = inject(LoginService);

  constructor() {
    this.findAllValidos();
  }

  findAllValidos() {
    const idUser = this.loginService.getIdUsuarioLogado();
    if (idUser) {
      this.postService.findAllValidos(idUser).subscribe({
        next: (posts) => {
          const imagesLength = 20;
          this.posts = posts.map((post) => {
            const validComments: CommentDto[] = post.comments;
            const randomIndex = Math.floor(Math.random() * imagesLength);
            const randomImage = this.postService.getRandomAnimalImage(randomIndex);
  
            return {
              ...post,
              comments: validComments,
              imagem: randomImage.path,
              imagemNome: randomImage.name,
              liked: post.liked,
              reported: post.reported,
            };
          });
        },
        error: (err) => {
          console.error('Error: ' + err);
          alert('Faça login novamente!');
          this.router.navigate(['/login']);
        },
      });
    } else {
      console.error('User is not logged in');
      alert('Você precisa estar logado para ver os posts.');
    }
  }
  
  onPostCreated() {
    setTimeout(() => {
      this.findAllValidos();
    }, 1500);
  }
}
