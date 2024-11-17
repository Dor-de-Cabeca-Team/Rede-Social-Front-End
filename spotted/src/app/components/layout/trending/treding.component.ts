// trending.component.ts
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PostService } from '../../../services/post/post.service';
import { PostDTO } from '../../../models/postDTO/post-dto';

@Component({
  selector: 'app-treding',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './treding.component.html',
  styleUrls: ['./treding.component.scss'],
})
export class TredingComponent {
  postService = inject(PostService);
  trendingList: { tags: string[]; description: string }[] = [];

  constructor() {
    this.loadTrendingPosts();
  }

  loadTrendingPosts() {
    this.postService.top10PostsComLike().subscribe({
      next: (posts: PostDTO[]) => {
        this.trendingList = posts.map((post) => ({
          tags: post.tags.map((tag) => tag.nome), // Extrai o nome de cada tag
          description: post.conteudo,
        }));
      },
      error: (err) => {
        console.error('Error loading trending posts: ' + err);
      },
    });
  }
}
