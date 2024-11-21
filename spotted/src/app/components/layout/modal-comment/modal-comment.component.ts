import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { PostComponent } from '../post/post.component';
import { PostDTO } from '../../../models/postDTO/post-dto';
import { CommonModule } from '@angular/common';
import { CommentComponent } from '../comment/comment.component';
import { LikeButtonComponent } from '../like-button/like-button.component';
import { ComplainButtonComponent } from '../complain-button/complain-button.component';
import { PostService } from '../../../services/post/post.service';
import { CreateCommentComponent } from '../create-comment/create-comment.component';
import { LoginService } from '../../../auth/login.service';

@Component({
  selector: 'app-modal-comment',
  standalone: true,
  imports: [],
  templateUrl: './modal-comment.component.html',
  styleUrl: './modal-comment.component.scss'
})
export class ModalCommentComponent { }

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-comment-dialog.html',
  standalone: true,
  styleUrl: './modal-comment.component.scss',
  imports: [MatDialogModule, MatButtonModule, PostComponent, CommentComponent, CommonModule, LikeButtonComponent, ComplainButtonComponent, CreateCommentComponent],
})
export class DialogContentCommentDialog {
  post: PostDTO;
  postService = inject(PostService);
  loginService = inject(LoginService);
  showComments:boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { post: PostDTO },
    public dialogRef: MatDialogRef<DialogContentCommentDialog>
  ) {
    this.post = data.post;
    this.findAllCommentsValidos();
  }

  findAllCommentsValidos() {
    console.log("atualizou");
  const idUser = this.loginService.getIdUsuarioLogado();
  if (idUser) {
    this.postService.showComments(this.post.id, idUser).subscribe({
      next: (comments) => {
        const imagesLength = 20; // Número de imagens disponíveis para os comentários
        this.post.comments = comments.map((comment) => {
          const animalIndex = comment.profileAnimal ?? 0;
          const animalImage = this.postService.getRandomAnimalImage(animalIndex % imagesLength);

          return {
            ...comment,
            imagem: animalImage.path,
              imagemNome: animalImage.name,
              liked: comment.liked,
              reported: comment.reported,
          };
        });
      },
      error: (err) => {
        console.error('Erro ao buscar comentários válidos: ' + err);
        alert('Ocorreu um erro ao carregar os comentários. Tente novamente mais tarde.');
      },
    });
  } else {
    console.error('Usuário não está logado');
    alert('Você precisa estar logado para ver os comentários.');
  }
}

onCreateComments() {
  setTimeout(() => {
    this.findAllCommentsValidos();
  }, 1500);
}
}
