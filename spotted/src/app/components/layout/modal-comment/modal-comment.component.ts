import { Component, Inject, inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { PostComponent } from '../post/post.component';
import { Post } from '../../../models/post/post';
import { CommonModule } from '@angular/common';
import { CommentComponent } from '../comment/comment.component';
import { LikeButtonComponent } from '../like-button/like-button.component';
import { ComplainButtonComponent } from '../complain-button/complain-button.component';
import { PostService } from '../../../services/post/post.service';

@Component({
  selector: 'app-modal-comment',
  standalone: true,
  imports: [],
  templateUrl: './modal-comment.component.html',
  styleUrl: './modal-comment.component.scss'
})
export class ModalCommentComponent {

}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-comment-dialog.html',
  standalone: true,
  styleUrl: './modal-comment.component.scss',
  imports: [MatDialogModule, MatButtonModule, PostComponent, CommentComponent, CommonModule, LikeButtonComponent, ComplainButtonComponent],
})
export class DialogContentCommentDialog {
  post: Post;
  postService = inject(PostService);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { post: Post },
    public dialogRef: MatDialogRef<DialogContentCommentDialog>
  ) {
    this.post = data.post;
    this.assignRandomImagesToComments();
  }

  private assignRandomImagesToComments(): void {
  this.post.comments = this.post.comments.map(comment => {
    const randomImage = this.postService.getRandomAnimalImage(comment.profileAnimal);
    return {
      ...comment,
      imagem: randomImage.path,
      imagemNome: randomImage.name
    };
  });
  }
}
