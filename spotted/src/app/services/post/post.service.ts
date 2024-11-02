import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../models/post/post';
import { Comment } from '../../models/comment/comment';
import { Tag } from '../../models/tag/tag';



@Injectable({
  providedIn: 'root',
})
export class PostService {
  http = inject(HttpClient);
  API = 'http://localhost:8080/api';

  createPost(content: string, userId: string, tags: Tag[]): Observable<Post> {
    const payload = {
      conteudo: content,
      tags: tags.map((tag) => ({ uuid: tag.uuid })),
      user: { uuid: userId },
    };

    return this.http.post<Post>(`${this.API}/post/save`, payload);
  }

  createComment(
    content: string,
    userId: string,
    postId: string
  ): Observable<Comment> {
    const payload = {
      conteudo: content,
      post: { uuid: postId },
      user: { uuid: userId },
    };

    return this.http.post<Comment>(`${this.API}/comment/save`, payload);
  }

  findAll(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.API}/post/findAll`);
  }

  findAllValidos(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.API}/post/postsValidos`);
  }

  findById(uuid: string): Observable<Post> {
    return this.http.get<Post>(`${this.API}/post/findById/${uuid}`);
  }

  likePost(idPost: string, idUser: string): Observable<string> {
    return this.http.post<string>(
      `${this.API}/post/like-post?idPost=${idPost}&idUser=${idUser}`,
      null,
      {
        responseType: 'text' as 'json', // Faz o Angular tratar a resposta como texto
      }
    );
  }

  likeComment(idComment: string, idUser: string): Observable<string> {
    return this.http.post<string>(
      `${this.API}/post/like-comentario?idComentario=${idComment}&idUser=${idUser}`,
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
      `${this.API}/post/denunciar-comentario?idComentario=${idComment}&idUser=${idUser}`,
      null,
      {
        responseType: 'text' as 'json',
      }
    );
  }

  showComments(idPost: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(
      `${this.API}/comment/findAllByPost_Uuid?uuid=${idPost}`
    );
  }

  top10PostsComLike(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.API}/post/top10PostsComLike`);
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

    return images[index];
  }
  constructor() {}
}
