import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  http = inject(HttpClient);

  API = 'http://localhost:8080/api/post';

  findAll(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.API}/findAll`);
  }

  findById(uuid: string): Observable<Post> {
    return this.http.get<Post>(`${this.API}/findById/${uuid}`);
  }

  constructor() { }
}
