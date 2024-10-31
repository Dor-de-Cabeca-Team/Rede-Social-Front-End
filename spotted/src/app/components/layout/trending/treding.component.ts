import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PostService } from '../../../services/post/post.service';
import { Post } from '../../../models/post/post';

@Component({
  selector: 'app-treding',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './treding.component.html',
  styleUrls: ['./treding.component.scss'],
})
export class TredingComponent {
  postService = inject(PostService);
  trendingList: { category: string; description: string }[] = [];

  constructor() {
    this.loadTrendingPosts();
  }

  loadTrendingPosts() {
    this.postService.top10PostsComLike().subscribe({
      next: (posts: Post[]) => {
        this.trendingList = posts.map((post) => ({
          category: post.conteudo, // Ajuste para o nome correto do campo da categoria
          description: post.conteudo,
        }));
      },
      error: (err) => {
        console.error('Error loading trending posts: ' + err);
      },
    });
  }
}
