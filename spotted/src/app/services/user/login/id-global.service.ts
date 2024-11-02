import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IdGlobalService {
  getUserUuid(): string | null {
    const user = localStorage.getItem('loggedUser');
    return user ? JSON.parse(user).uuid : null; // Ajuste conforme a estrutura do objeto `user`
  }
}
