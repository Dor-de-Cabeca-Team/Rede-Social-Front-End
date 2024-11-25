import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
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
  @Output() modalClosed: EventEmitter<void> = new EventEmitter<void>();

  postService = inject(PostService);
  liked: boolean = false;
  reported: boolean = false;

  constructor(private dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(DialogContentCommentDialog, {
      data: { post: this.post },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.modalClosed.emit(); 
    });
  }
}
