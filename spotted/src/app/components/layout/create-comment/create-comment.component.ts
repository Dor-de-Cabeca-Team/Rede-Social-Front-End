import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { PostService } from '../../../services/post/post.service';
import { FormsModule } from '@angular/forms';
import { PostDTO } from '../../../models/postDTO/post-dto';
import { LoginService } from '../../../auth/login.service';

@Component({
  selector: 'app-create-comment',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.scss'],
})
export class CreateCommentComponent {
  @Input() post!: PostDTO;
  commentContent = '';
  @Output() commentCreated = new EventEmitter<void>();

  loginService = inject(LoginService);

  constructor(private postService: PostService) {}

  createComment(postUuid: string, event?: Event): void {
    if (event) {
      const keyboardEvent = event as KeyboardEvent;
      keyboardEvent.preventDefault();
    }

    const userId = this.loginService.getIdUsuarioLogado();

    if (this.commentContent.trim()) {
      if (userId) {
        // Check if userId is not null
        this.postService
          .createComment(this.commentContent, userId, postUuid)
          .subscribe({
            next: (response) => {
              console.log('Comment created successfully:', response);
              this.commentContent = '';
              this.commentCreated.emit();
            },
            error: (error) => {
              console.error('Error creating comment:', error);
            },
          });
      } else {
        alert('User ID is not available.');
      }
    } else {
      alert('Please insert some content before commenting.');
    }
  }
}
