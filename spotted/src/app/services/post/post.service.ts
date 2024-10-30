import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../../models/post/post';
import { Comment } from '../../models/comment/comment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  http = inject(HttpClient);
  API = 'http://localhost:8080/api';

  findAll(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.API}/post/findAll`);
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

  denunciarPost(idPost: string, idUser: string): Observable<string> {
    return this.http.post<string>(
      `${this.API}/post/denunciar-post?idPost=${idPost}&idUser=${idUser}`,
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

  constructor() {}
}
