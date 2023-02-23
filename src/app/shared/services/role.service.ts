import { HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginacaoResponse } from '../models/paginacao-response/paginacao-response.model';
import { Roles } from '../models/usuario/roles.model';
import { ServiceBase } from './servico-base.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends ServiceBase<Roles> {

  constructor(
    protected override injector: Injector) {
    super(`api/role`, injector, Roles.fromJson);
  }

  override obterTodosPaginados(pageSize: string, pageIndex: string, filtroSelect: string, selecionadoId: number): Observable<PaginacaoResponse<Roles>> {
    let params = new HttpParams()
      .set('id', selecionadoId == null ? undefined : selecionadoId)
      .set('nome', filtroSelect == null ? undefined : filtroSelect)

    return this.http.get<PaginacaoResponse<Roles>>(`${environment.BASE_URL + this.caminhoApi}?PageSize=${pageSize}&PageIndex=${pageIndex}`, { params }).pipe(
      map(this.jsonDadosToResourcesPaginacao.bind(this)),
      catchError(this.handleError)
    )
  }
}