import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentDto } from '../../models/commentDTO/comment-dto'
import { Tag } from '../../models/tag/tag';
import { environment } from '../../../environments/environment';
import { PostDTO } from '../../models/postDTO/post-dto';
import { PostTop10 } from '../../models/trending/post-top10';



@Injectable({
  providedIn: 'root',
})
export class PostService {
  http = inject(HttpClient);
  API = environment.SERVIDOR + '/api';

  createPost(
    content: string,
    userId: string,
    tags: { nome: string }[]
  ): Observable<string> {
    const payload = {
      conteudo: content,
      tags: tags,
      userId: userId,
    };

    // Especifica que a resposta é texto, não JSON
    return this.http.post<string>(`${this.API}/post/save`, payload, {
      responseType: 'text' as 'json',
    });
  }

  createComment(
    content: string,
    userId: string,
    postId: string
  ): Observable<String> {
    const payload = {
      conteudo: content,
      post: postId,
      user: userId,
    };

    return this.http.post<string>(`${this.API}/comment/save`, payload, {
      responseType: 'text' as 'json',
    });
  }

  findAll(): Observable<PostDTO[]> {
    return this.http.get<PostDTO[]>(`${this.API}/post/findAll`);
  }

  findAllValidos(idUser: string): Observable<PostDTO[]> {
    return this.http.get<PostDTO[]>(
      `${this.API}/post/postsValidos?idUser=${idUser}`
    );
  }

  findById(uuid: string): Observable<PostDTO> {
    return this.http.get<PostDTO>(`${this.API}/post/findById/${uuid}`);
  }

  likePost(idPost: string, idUser: string): Observable<string> {
    return this.http.post<string>(
      `${this.API}/post/like-post?idPost=${idPost}&idUser=${idUser}`,
      null,
      {
        responseType: 'text' as 'json',
      }
    );
  }

  likeComment(idComment: string, idUser: string): Observable<string> {
    return this.http.post<string>(
      `${this.API}/post/like-comentario?idComment=${idComment}&idUser=${idUser}`,
      null,
      {
        responseType: 'text' as 'json',
      }
    );
  }

  denunciarPost(idPost: string, idUser: string): Observable<string> {
    return this.http.post<string>(
      `${this.API}/post/denunciar-post?idPost=${idPost}&idUser=${idUser}`,
      null,
      {
        responseType: 'text' as 'json',
      }
    );
  }

  denunciarComentario(idComment: string, idUser: string): Observable<string> {
    return this.http.post<string>(
      `${this.API}/post/denunciar-comentario?idComment=${idComment}&idUser=${idUser}`,
      null,
      {
        responseType: 'text' as 'json',
      }
    );
  }

  showComments(idPost: string, idUser: string): Observable<CommentDto[]> {
    return this.http.get<CommentDto[]>(
      `${this.API}/comment/findAllValidosByPost_Uuid?idPost=${idPost}&idUser=${idUser}`
    );
  }

  top10PostsComLike(): Observable<PostTop10[]> {
    return this.http.get<PostTop10[]>(`${this.API}/post/top10PostsComLike`);
  }

  // comentarPost(idPost: string, idUser: string, comentario: string): Observable<string> {
  //   return this.http.post<string>(`${this.API}/comentar-post?idPost=${idPost}&idUser=${idUser}&comentario=${comentario}`, null, {
  //    responseType: 'text' as 'json'
  //  });
  // }

  getRandomAnimalImage(index: number): { name: string; path: string } {
    const images = [
      { name: 'Cachorro Anônimo', path: 'assets/animals/Recurso37@2x.png' },
      { name: 'Borboleta Anônima', path: 'assets/animals/Recurso4@2x.png' },
      { name: 'Galo Anônimo', path: 'assets/animals/Recurso36@2x.png' },
      { name: 'Coelho Anônimo', path: 'assets/animals/Recurso6@2x.png' },
      { name: 'Porco Anônimo', path: 'assets/animals/Recurso3@2x.png' },
      { name: 'Rinoceronte Anônimo', path: 'assets/animals/Recurso35@2x.png' },
      { name: 'Águia Anônima', path: 'assets/animals/Recurso34@2x.png' },
      { name: 'Touro Anônimo', path: 'assets/animals/Recurso33@2x.png' },
      { name: 'Cavalo Anônimo', path: 'assets/animals/Recurso32@2x.png' },
      { name: 'Coiote Anônimo', path: 'assets/animals/Recurso31@2x.png' },
      { name: 'Elefante Anônimo', path: 'assets/animals/Recurso30@2x.png' },
      { name: 'Papagaio Anônimo', path: 'assets/animals/Recurso29@2x.png' },
      { name: 'Tucano Anônimo', path: 'assets/animals/Recurso28@2x.png' },
      { name: 'Gato Anônimo', path: 'assets/animals/Recurso27@2x.png' },
      { name: 'Calau Anônimo', path: 'assets/animals/Recurso26@2x.png' },
      { name: 'Pato Anônimo', path: 'assets/animals/Recurso25@2x.png' },
      { name: 'Antílope Anônimo', path: 'assets/animals/Recurso24@2x.png' },
      { name: 'Alce Anônimo', path: 'assets/animals/Recurso23@2x.png' },
      { name: 'Ema Anônima', path: 'assets/animals/Recurso22@2x.png' },
      { name: 'Hipopótamo Anônimo', path: 'assets/animals/Recurso21@2x.png' },
    ];

    // Garante que o índice esteja no intervalo do array
    if (index < 0 || index >= images.length) {
      console.warn(`Índice inválido (${index}). Usando uma imagem padrão.`);
      // Retorna uma imagem padrão
      return { name: 'Imagem Padrão', path: 'assets/animals/default.png' };
    }

    // Usa o índice válido
    return images[index % images.length];
  }
  constructor() {}
}
