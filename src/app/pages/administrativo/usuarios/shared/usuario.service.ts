import { HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { IGetRowsParams } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { ClaimUsuario } from 'src/app/pages/acesso/shared/models/claim-usuario.model';
import { PaginacaoResponse } from 'src/app/shared/models/paginacao-response/paginacao-response.model';
import { ServiceBase } from 'src/app/shared/services/servico-base.service';
import { environment } from 'src/environments/environment';
import { Usuario } from './models/usuario.model';
import { catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends ServiceBase<Usuario> {

  constructor(
    protected override injector: Injector
  ) {
    super("api/Usuario", injector, Usuario.fromJson);
  }

  obterTodosPaginados(pageSize: string, pageIndex: string, filtro: IGetRowsParams): Observable<PaginacaoResponse<Usuario>> {
    let params = new HttpParams();
    params = new HttpParams().set('nome', filtro.filterModel['nome']?.filter)
      .set('sortType', filtro.sortModel[0] == null ? undefined : filtro.sortModel[0].sort)
      .set('sortValue', filtro.sortModel[0] == null ? undefined : filtro.sortModel[0].colId)


    return this.http.get<PaginacaoResponse<Usuario>>(`${environment.BASE_URL + this.caminhoApi}?PageSize=${pageSize}&PageIndex=${pageIndex}`, { params }).pipe(
      map(this.jsonDadosToResourcesPaginacao.bind(this)),
      catchError(this.handleError)
    )
  }

  async inserirClaimUsuario(claim: ClaimUsuario): Promise<Usuario> {
    return await this.http.post<Usuario>(`${environment.BASE_URL}${this.caminhoApi}/inserir-claim-usuario`, claim).toPromise();
  }

  async removerClaimUsuario(claim: ClaimUsuario): Promise<Usuario> {
    return await this.http.put<Usuario>(`${environment.BASE_URL}${this.caminhoApi}/remover-claim-usuario`, claim).toPromise();
  }

  async atualizarClassificacao(usuario: Usuario): Promise<Usuario> {
    return await this.http.put<Usuario>(`${environment.BASE_URL}${this.caminhoApi}/atualizar-classificacao-usuario`, usuario).toPromise();
  }

  async atualizarRole(usuarioId: string, roleId: string): Promise<any> {
    return await this.http.put<any>(`${environment.BASE_URL}${this.caminhoApi}/atualizar-role`, { usuarioId, roleId }).toPromise();
  }
}
