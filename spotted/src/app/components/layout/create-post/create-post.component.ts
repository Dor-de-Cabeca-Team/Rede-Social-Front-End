import { Component } from '@angular/core';
import { PostService } from '../../../services/post/post.service';
import { Tag } from '../../../models/tag/tag';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss'
})
export class CreatePostComponent {
  userid = '88fc4171-c04e-4659-a8f3-073745701517';
  postContent = '';
  tags: Tag[] = [];

  constructor(private postService: PostService) {}

  createPost(): void {
    if (this.postContent.trim()) {
      this.postService.createPost(this.postContent, this.userid, this.tags)
        .subscribe({
          next: (response) => {
            console.log('Post criado com sucesso:', response);
            this.postContent = '';
          },
          error: (error) => {
            console.error('Erro ao criar post:', error);
          }
        });
    } else {
      alert('Por favor, insira algum conteúdo antes de postar.');
    }
  }
}
