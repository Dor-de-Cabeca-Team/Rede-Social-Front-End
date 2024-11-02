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
  @Output() postCreated = new EventEmitter<void>(); // Emite um evento quando um post é criado

  idGlobalService = inject(IdGlobalService);
  postService = inject(PostService);

  postContent = '';
  tags: Tag[] = [];

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
      this.postService
        .createPost(this.postContent, userid, this.tags)
        .subscribe({
          next: (response) => {
            console.log('Post criado com sucesso:', response);
            this.postContent = '';
            this.postCreated.emit(); // Emite o evento após a criação
          },
          error: (error) => {
            console.error('Erro ao criar post:', error);
            alert('Erro ao criar post. Tente novamente.');
          },
        });
    } else {
      alert('Por favor, insira algum conteúdo antes de postar.');
    }
  }
}
