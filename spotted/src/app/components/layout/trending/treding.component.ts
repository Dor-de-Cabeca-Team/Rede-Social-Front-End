// trending.component.ts
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { PostService } from '../../../services/post/post.service';
import { PostDTO } from '../../../models/postDTO/post-dto';
import { PostTop10 } from '../../../models/trending/post-top10';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentCommentDialog } from '../modal-comment/modal-comment.component';
import { CommentDto } from '../../../models/commentDTO/comment-dto';
import { LoginService } from '../../../auth/login.service';

@Component({
  selector: 'app-treding',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './treding.component.html',
  styleUrls: ['./treding.component.scss'],
})
export class TredingComponent {
  post!:PostDTO;
  postService = inject(PostService);
  trendingList: { id: string; tags: string[]; description: string;}[] = [];
  showModal: boolean = false;
  loginService = inject(LoginService);


  constructor(private dialog: MatDialog) {
    this.loadTrendingPosts();
  }

  loadTrendingPosts() {
    this.postService.top10PostsComLike().subscribe({
      next: (posts: PostTop10[]) => {
        this.trendingList = posts.map((post) => ({
          id: post.id,
          tags: Array.isArray(post.tags) ? post.tags.map((tag) => tag.nome) : [],
          description: post.conteudo
        }));
      },
      error: (err) => {
        console.error('Error loading trending posts: ' + err);
      },
    });
  }

  openDialog(postId: string) {
    this.postService.findById(postId).subscribe({
      next: (post: PostDTO) => {
        this.dialog.open(DialogContentCommentDialog, {
          data: {
            post: post
          }
        });
      },
      error: (err) => {
        console.error("Erro ao carregar o post: " + err);
      }
    });
  }
}