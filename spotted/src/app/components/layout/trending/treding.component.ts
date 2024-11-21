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
  trendingList: { id: string; tags: string[]; description: string; comments: CommentDto[] }[] = [];
  showModal: boolean = false;
  loginService = inject(LoginService);


  constructor(private dialog: MatDialog) {
    this.loadTrendingPosts();
  }

  loadTrendingPosts() {
    const idUser = this.loginService.getIdUsuarioLogado();

    if (!idUser) {
      console.error("Usuário não está logado ou ID inválido.");
      return;
    }
    
    this.postService.top10PostsComLike(idUser).subscribe({
      next: (posts: PostTop10[]) => {
        this.trendingList = posts.map((post) => ({
          id: post.id,
          tags: Array.isArray(post.tags) ? post.tags.map((tag) => tag.nome) : [],
          description: post.conteudo,
          comments: post.comments,
        }));
      },
      error: (err) => {
        console.error('Error loading trending posts: ' + err);
      },
    });
  }
  
  

  openDialog(postId: string) {
    const selectedPost = this.trendingList.find(post => post.id === postId);
    
    if (selectedPost) {
      this.dialog.open(DialogContentCommentDialog, {
        data: {
          post: selectedPost
        }
      });
    } else {
      console.error("Post não encontrado!");
    }
  }
  

  toggleModal() {
    this.showModal = !this.showModal;
  }
}