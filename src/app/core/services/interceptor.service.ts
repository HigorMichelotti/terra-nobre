import { Injectable, NgModule } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpParams,
} from '@angular/common/http';
import { UsuariosLogado } from 'src/app/pages/acesso/shared/models/usuario-logado.model';
import { Observable } from 'rxjs';

@Injectable()

export class HttpsRequestInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const usuario: UsuariosLogado = JSON.parse(localStorage.getItem("usuario"));

    if (usuario == null) {
      var requestClearParams = request.clone({
        params: this.limparParametros(request.params)
      });

      return next.handle(requestClearParams)
    }

    if (usuario.tokenAcesso) {

      var requestComToken = request.clone({
        headers: request.headers.set(
          "Authorization",
          "Bearer " + usuario.tokenAcesso,
        ),
        params: this.limparParametros(request.params)
      });

      return next.handle(requestComToken);
    }

    return next.handle(request);
  }

  limparParametros(params: HttpParams) {
    let cleanedParams = new HttpParams();

    params.keys().forEach(x => {
      if (params.get(x) && params.get(x) != 'undefined' && params.get(x) != 'null')
        cleanedParams = cleanedParams.append(x, params.get(x));
    })

    return cleanedParams;
  }
}
