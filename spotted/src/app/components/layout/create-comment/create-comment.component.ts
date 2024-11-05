import { Component, inject, Input } from '@angular/core';
import { PostService } from '../../../services/post/post.service';
import { FormsModule } from '@angular/forms';
import { Post } from '../../../models/post/post';
import { IdGlobalService } from '../../../services/user/login/id-global.service';

@Component({
  selector: 'app-create-comment',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.scss'] // Corrected from styleUrl to styleUrls
})
export class CreateCommentComponent {
  @Input() post!: Post;
  commentContent = '';

  private idGlobalService = inject(IdGlobalService);

  constructor(private postService: PostService) {}

  private getUserId(): string | null {
    return this.idGlobalService.getUserUuid(); // Fetches the UUID
  }

  createComment(postUuid: string): void {
    const userId = this.getUserId();
  
    if (this.commentContent.trim()) {
      if (userId) { // Check if userId is not null
        this.postService.createComment(this.commentContent, userId, postUuid)
          .subscribe({
            next: (response) => {
              console.log('Comment created successfully:', response);
              this.commentContent = ''; // Reset comment content after successful creation
            },
            error: (error) => {
              console.error('Error creating comment:', error);
            }
          });
      } else {
        alert('User ID is not available.'); // Handle the case when userId is null
      }
    } else {
      alert('Please insert some content before commenting.');
    }
  }
  
}
