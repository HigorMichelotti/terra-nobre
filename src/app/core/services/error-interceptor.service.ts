import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';

export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          let message: any;
          switch (error.status) {
            case HttpStatusCode.Forbidden:
              message = "Acesso não autorizado.";
              break;
            case HttpStatusCode.Unauthorized:
              message = "Sua sessão expirou. Faça o login novamente.";
              this.authService.logout();
              break;
            case HttpStatusCode.InternalServerError:
              message = "Não foi possível prosseguir com a solicitação.";
              break;
            case HttpStatusCode.BadRequest:
              message = this.parseErrors(error).errorsMessage;
              break;
            case HttpStatusCode.Conflict:
              console.log(error)
              message = this.parseErrors(error).errorsMessage;
              break;
          }
          return throwError(() => message || "Erro desconhecido, contate o suporte.");
        })
      )
  }

  parseErrors(httpErrorResponse: HttpErrorResponse) {
    console.log(`parseErrors`, httpErrorResponse)

    const errorsMessage = []

    const { errors } = httpErrorResponse.error;

    for (var key of errors) {
      errorsMessage.push(`${key.message}`);
    }
    console.log(errorsMessage)
    return { errorsMessage };
  }

}

