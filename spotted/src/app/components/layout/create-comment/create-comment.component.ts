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
  @Output() commentCreated = new EventEmitter<void>();

  commentContent = '';
  isLoading = false;

  loginService = inject(LoginService);

  constructor(private postService: PostService) {}

  createComment(postUuid: string, event?: Event): void {
    if (event) {
      const keyboardEvent = event as KeyboardEvent;
      keyboardEvent.preventDefault();
    }

    const userId = this.loginService.getIdUsuarioLogado();

    if (!userId) {
      alert('Usuário não logado. Faça login para comentar.');
      return;
    }

    if (this.commentContent.trim()) {
<<<<<<< HEAD
      this.isLoading = true;

      this.postService.createComment(this.commentContent, userId, postUuid).subscribe({
        next: (response) => {
          console.log('Comentário criado com sucesso:', response);
          this.commentContent = ''; // Limpa o conteúdo após o envio
          this.commentCreated.emit();
        },
        error: (error) => {
          console.error('Erro ao criar comentário:', error);
          alert('Erro ao criar comentário. Tente novamente.');
        },
        complete: () => {
          this.isLoading = false; // Reativa o botão ao finalizar
        },
      });
=======
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
>>>>>>> 1df784837061eee29ba2ee230b83bd131bcb65d2
    } else {
      alert('Por favor, insira algum conteúdo antes de comentar.');
    }
  }
}
