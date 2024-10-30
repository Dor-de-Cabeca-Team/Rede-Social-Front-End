import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import { PostComponent } from '../post/post.component';
import { Post } from '../../../models/post/post';
import { CommonModule } from '@angular/common';
import { CommentComponent } from '../comment/comment.component';

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
  templateUrl: 'dialog-content-example-dialog.html',
  standalone: true,
  styleUrl: './modal-comment.component.scss',
  imports: [MatDialogModule, MatButtonModule, PostComponent, CommentComponent, CommonModule],
})
export class DialogContentExampleDialog {
  post: Post;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { post: Post },
    public dialogRef: MatDialogRef<DialogContentExampleDialog>
  ) {
    this.post = data.post;
  }
}
