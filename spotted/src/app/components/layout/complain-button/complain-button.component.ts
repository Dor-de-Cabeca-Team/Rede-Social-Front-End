import { Component, Input, inject } from '@angular/core';
import { PostService } from '../../../services/post/post.service';
import { LoginService } from '../../../auth/login.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-complain-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './complain-button.component.html',
  styleUrls: ['./complain-button.component.scss'],
})
export class ComplainButtonComponent {
  @Input() postUuid!: string;
  @Input() commentUuid!: string;
  @Input() reported: boolean = false;
  postService = inject(PostService);
  loginService = inject(LoginService);

  denunciarPost() {
    const userId = this.loginService.getIdUsuarioLogado();
    if (userId) {
      this.postService.denunciarPost(this.postUuid, userId).subscribe({
        next: (response) => {
          if(this.reported == false){
            this.reported = true;
          } else{
            this.reported = false
          }
        },
        error: (err) => {
          console.error('Error: ', err);
          alert(
            'Error: ' + (err.error?.error || 'Ocorreu um erro desconhecido')
          );
        },
      });
    } else {
      alert('Usuário não logado.');
    }
  }

  denunciarComment() {
    const userId = this.loginService.getIdUsuarioLogado();
    if (userId) {
      this.postService.denunciarComentario(this.commentUuid, userId).subscribe({
        next: (response) => {
          if(this.reported == false){
            this.reported = true;
          } else{
            this.reported = false
          }
        },
        error: (err) => {
          console.error('Error: ', err);
          alert(
            'Error: ' + (err.error?.error || 'Ocorreu um erro desconhecido')
          );
        },
      });
    } else {
      alert('Usuário não logado.');
    }
  }

  denunciar() {
    if (this.postUuid) {
      this.denunciarPost();
    } else if (this.commentUuid) {
      this.denunciarComment();
    }
  }
}
