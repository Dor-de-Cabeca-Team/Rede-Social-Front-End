// trending.component.ts
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
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
// Em trending.component.ts
export class TredingComponent {
  post!: PostDTO;
  postService = inject(PostService);
  @Output() modalClosed: EventEmitter<string> = new EventEmitter<string>();

  trendingList: { id: string; tags: string[]; description: string; }[] = [];  // Não precisa da imagem aqui
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
    const idUser = this.loginService.getIdUsuarioLogado();
    if (idUser) {
    this.postService.findById(postId, idUser).subscribe({
      next: (post: PostDTO) => {
        if (post.profileAnimal !== undefined) {
          const imagesLength = 20;
          const animalIndex = post.profileAnimal ?? 0;
          const animalImage = this.postService.getRandomAnimalImage(animalIndex % imagesLength);
  
          post.imagem = animalImage.path;
          post.imagemNome = animalImage.name;
        }
  
        const dialogRef = this.dialog.open(DialogContentCommentDialog, {
          data: { post: post },
        });
    
        dialogRef.afterClosed().subscribe(() => {
          this.modalClosed.emit(postId);
        });
      },
      error: (err) => {
        console.error("Erro ao carregar o post: " + err);
      }
    });
  } else {
    console.error('User is not logged in');
    alert('Você precisa estar logado para ver os posts.');
  }
  }  
}
