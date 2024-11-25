import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const meuhttpInterceptor: HttpInterceptorFn = (request, next) => {
  let router = inject(Router);

  let token = localStorage.getItem('token');

  // Verifique se o token existe e se a URL não é a rota de login, "esqueci minha senha" nem "reset-password"
  if (
    token &&
    !router.url.includes('/login') &&
    !router.url.includes('/forgot-password') &&
    !router.url.includes('/reset-password')
  ) {
    request = request.clone({
      setHeaders: { Authorization: 'Bearer ' + token },
    });
  }

  return next(request).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          // Tratar 401 - Não autorizado
          console.log(
            'Erro 401 - Token inválido ou expirado. Redirecionando para login.'
          );
          router.navigate(['/login']);
        } else if (err.status === 403) {
          // Tratar 403 - Acesso negado
          console.log('Erro 403 - Acesso negado. Redirecionando para login.');
          router.navigate(['/login']);
        } else if (err.status === 500) {
          // Tratar erro 500 - Erro no servidor
          console.error('Erro no servidor:', err);
          alert('Erro no servidor. Tente novamente mais tarde.');
        } else {
          console.error('Erro HTTP:', err);
        }
      } else {
        console.error('Erro desconhecido:', err);
      }

      return throwError(() => err); // Repassa o erro para a aplicação
    })
  );
};
