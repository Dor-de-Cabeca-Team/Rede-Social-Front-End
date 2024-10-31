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
  userid = 'bbd03652-bf81-4cf0-aeb9-8def7ee59649';
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