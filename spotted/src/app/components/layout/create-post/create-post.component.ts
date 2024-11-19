import { Component, Output, EventEmitter, inject } from '@angular/core';
import { PostService } from '../../../services/post/post.service';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../../auth/login.service';

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent {
  @Output() postCreated = new EventEmitter<void>();

  loginService = inject(LoginService);
  postService = inject(PostService);

  postContent = '';
  tagsInput = ''; // Input de tags como string
  isLoading = false;

  createPost(): void {
    const userId = this.loginService.getIdUsuarioLogado();

    if (!userId) {
      alert('Usuário não logado. Faça login para criar um post.');
      return;
    }

    if (this.postContent.trim()) {
      this.isLoading = true;

      const extractedTags = this.extractHashtags(this.postContent);

      const tags = [...extractedTags, ...this.parseTags(this.tagsInput)];

      this.postService.createPost(this.postContent, userId, tags).subscribe({
        next: (response) => {
          console.log('Post criado com sucesso:', response);
          this.postContent = '';
          this.tagsInput = '';
          this.postCreated.emit();
        },
        error: (error) => {
          console.error('Erro ao criar post:', error);
          alert('Erro ao criar post. Tente novamente.');
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    } else {
      alert('Por favor, insira algum conteúdo antes de postar.');
    }
  }

  private parseTags(tagsInput: string): { nome: string }[] {
    return tagsInput
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag)
      .map((tag) => ({ nome: tag }));
  }

  private extractHashtags(content: string): { nome: string }[] {
    const hashtagRegex = /#(\w+)/g; // Regex para capturar palavras iniciadas com #
    const tags: { nome: string }[] = [];
    let match;

    while ((match = hashtagRegex.exec(content)) !== null) {
      tags.push({ nome: match[1] }); // Adiciona a tag sem o símbolo #
    }

    return tags;
  }
}