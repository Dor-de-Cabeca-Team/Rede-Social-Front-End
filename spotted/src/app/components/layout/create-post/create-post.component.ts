import { Component, Output, EventEmitter, inject } from '@angular/core';
import { PostService } from '../../../services/post/post.service';
import { Tag } from '../../../models/tag/tag';
import { FormsModule } from '@angular/forms';
import { IdGlobalService } from '../../../services/user/login/id-global.service';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent {
  @Output() postCreated = new EventEmitter<void>();
  
  idGlobalService = inject(IdGlobalService);
  postService = inject(PostService);
  
  postContent = '';
  tags: Tag[] = [];
  isLoading = false;

  private getUserId(): string | null {
    return this.idGlobalService.getUserUuid();
  }

  createPost(): void {
    const userid = this.getUserId();
    if (!userid) {
      alert('Usuário não logado. Faça login para criar um post.');
      return;
    }

    if (this.postContent.trim()) {
      this.isLoading = true;
      
      this.postService.createPost(this.postContent, userid, this.tags).subscribe({
        next: (response) => {
          console.log('Post criado com sucesso:', response);
          this.postContent = '';
          this.postCreated.emit();
        },
        error: (error) => {
          console.error('Erro ao criar post:', error);
          alert('Erro ao criar post. Tente novamente.');
        },
        complete: () => {
          this.isLoading = false;
        }
      });

      // Opcional: desativar o spinner após 3 segundos
      setTimeout(() => {
        this.isLoading = false;
      }, 3000);
    } else {
      alert('Por favor, insira algum conteúdo antes de postar.');
    }
  }
}
