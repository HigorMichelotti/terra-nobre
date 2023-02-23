import { KeyLocalStorage, LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { EmitirAlerta } from 'src/app/shared/helpers/sweet-alertas';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Usuario } from 'src/app/pages/administrativo/usuarios/shared/models/usuario.model';
import { UsuariosLogado } from 'src/app/pages/acesso/shared/models/usuario-logado.model';
import { AlterarSenha } from 'src/app/shared/models/usuario/alterar-senha.model';
import { NovoUsuario } from 'src/app/pages/acesso/shared/models/novo-usuario.model';
import { ClaimUsuario } from 'src/app/pages/acesso/shared/models/claim-usuario.model';
import { UsuarioLogadoDadosAcesso } from 'src/app/pages/acesso/shared/models/usuario-logado-dados-acesso.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  caminhoApi = "api/identidade"

  constructor(
    private rota: Router,
    private http: HttpClient,
    protected localStorageService: LocalStorageService) { }

  fazerLogin(dados: any): Observable<UsuariosLogado> {
    if (dados.email == "murilo.soares" && dados.senha == '6152340a') {
      return of(new UsuariosLogado('autenticado', 8, new UsuarioLogadoDadosAcesso('muurilosoares@gmail.com.com', 'Murilo Soares', new Array<ClaimUsuario>())))
    }
    return of(null);
  }

  cadastrarUsuario(dados: NovoUsuario): Observable<NovoUsuario> {
    return this.http.post(`${environment.BASE_URL}${this.caminhoApi}/nova-conta`, dados).pipe(
      map((data: any) => {
        return UsuariosLogado.fromJson(data)
      })
    )
  }

  async logout() {
    this.localStorageService.clear()
    this.rota.navigate(["/"]);
  }

  verificarUsuario(dados: Usuario): Observable<any> {
    return this.http.post(`${environment.BASE_URL}${this.caminhoApi}/verificar-usuario`, dados).pipe(
      map((data: any) => data)
    )
  }

  alterarSenha(dados: AlterarSenha): Observable<AlterarSenha> {
    return this.http.put<any>(`${environment.BASE_URL}${this.caminhoApi}/alterar-senha`, dados)
      .pipe(
        map((data: any) => {
          return data;
        }),
      )
  }

  async resetarSenha(dados: AlterarSenha) {
    return this.http.post<any>(`${environment.BASE_URL}${this.caminhoApi}/resetar-senha`, dados).toPromise()
  }

  obterDadosUsuario(): UsuariosLogado {
    let usuarioLogado: UsuariosLogado;

    if (this.localStorageService.get(KeyLocalStorage.Usuario))
      usuarioLogado = this.localStorageService.get(KeyLocalStorage.Usuario)

    return usuarioLogado
  }

  existeDadosUsuario(): boolean {
    return this.obterDadosUsuario() ? true : false;
  }
}
