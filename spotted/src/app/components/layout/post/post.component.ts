import { Component, Input, inject } from '@angular/core';
import { Post } from '../../../models/post/post';
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
  styleUrl: './post.component.scss'
})
export class PostComponent {
  // vai receber os posts que são passados pelo findAll dentro do feed.component
  // por isso o @Input()
  @Input() post!: Post;

  postService = inject(PostService);
  isLiked: boolean = false;
  showCommentsComponent: boolean = false;
  showModal: boolean = false;

  userid = 'bbd03652-bf81-4cf0-aeb9-8def7ee59649'; // fixo por enquanto

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
        console.log('Post reported: ' + response);
        alert('Post reported successfully: ' + response);
      },
      error: (err) => {
        console.error('Error: ', err);
        alert('Error: ' + err.error?.error || 'Ocorreu um erro desconhecido');
      },
    });
  }


}
