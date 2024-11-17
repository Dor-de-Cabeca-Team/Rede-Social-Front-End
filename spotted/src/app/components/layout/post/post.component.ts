import { Component, Input, inject } from '@angular/core';
import { PostDTO } from '../../../models/postDTO/post-dto';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PostService } from '../../../services/post/post.service';
import { CommentComponent } from '../comment/comment.component';
import { ModalCommentComponent } from '../modal-comment/modal-comment.component';
import { DialogContentCommentDialog } from '../modal-comment/modal-comment.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LikeButtonComponent } from '../like-button/like-button.component';
import { ComplainButtonComponent } from '../complain-button/complain-button.component';

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [CommonModule, RouterLink, CommentComponent, ModalCommentComponent, MatDialogModule, LikeButtonComponent, ComplainButtonComponent],
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  @Input() post!: PostDTO;

  postService = inject(PostService);
  isLiked: boolean = false;
  showCommentsComponent: boolean = false;
  showModal: boolean = false;

  userid = '9efc06b5-2e29-4c9a-bcfa-68a28ac475cd'; // fixo por enquanto

  constructor(private dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(DialogContentCommentDialog, {
      data: {
        post: this.post,
      }
    });
  }

  toggleModal() {
    this.showModal = !this.showModal;
  }

  denunciarPost() {
    this.postService.denunciarPost(this.post.uuid, this.userid).subscribe({
      next: (response) => {
        // Sucesso
      },
      error: (err) => {
        console.error('Error: ', err);
        alert('Error: ' + err.error?.error || 'Ocorreu um erro desconhecido');
      },
    });
  }
}
