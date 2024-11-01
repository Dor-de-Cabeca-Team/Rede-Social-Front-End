import { Component, Input } from '@angular/core';
import { PostService } from '../../../services/post/post.service';
import { FormsModule } from '@angular/forms';
import { Post } from '../../../models/post/post';

@Component({
  selector: 'app-create-comment',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-comment.component.html',
  styleUrl: './create-comment.component.scss'
})
export class CreateCommentComponent {
  @Input() post!: Post;
  userid = '88fc4171-c04e-4659-a8f3-073745701517';
  commentContent = '';

  constructor(private postService: PostService) {}

  createComment(postUuid: string): void {
    if (this.commentContent.trim()) {
      this.postService.createComment(this.commentContent, this.userid, postUuid)
        .subscribe({
          next: (response) => {
            console.log('Comment created successfully:', response);
            this.commentContent = '';
          },
          error: (error) => {
            console.error('Error creating comment:', error);
          }
        });
    } else {
      alert('Please insert some content before commenting.');
    }
  }

}
