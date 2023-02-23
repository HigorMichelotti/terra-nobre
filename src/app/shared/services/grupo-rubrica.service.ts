import { HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { IGetRowsParams } from 'ag-grid-community';
import { catchError, map, Observable } from 'rxjs';
import { PaginacaoResponse } from 'src/app/shared/models/paginacao-response/paginacao-response.model';
import { ServiceBase } from 'src/app/shared/services/servico-base.service';
import { environment } from 'src/environments/environment';
import { GrupoRubrica } from '../../pages/administrativo/grupo-rubricas/shared/models/grupo-rubrica.model';

@Injectable({
  providedIn: 'root'
})
export class GrupoRubricaService extends ServiceBase<GrupoRubrica> {

  constructor(
    protected override injector: Injector) {
    super(`api/grupo-rubrica`, injector, GrupoRubrica.fromJson);
  }

  override obterTodosPaginados(pageSize: string, pageIndex: string, filtro: IGetRowsParams | string, selecionadoId: number): Observable<PaginacaoResponse<GrupoRubrica>> {
    let params = new HttpParams();

    if (typeof filtro == 'string')
      params = new HttpParams()
        .set('id', selecionadoId == null ? undefined : selecionadoId)
        .set('nome', filtro == null ? undefined : filtro)
    else {
      params = new HttpParams().set('nome', filtro.filterModel['nome']?.filter)
        .set('sortType', filtro.sortModel[0] == null ? undefined : filtro.sortModel[0].sort)
        .set('sortValue', filtro.sortModel[0] == null ? undefined : filtro.sortModel[0].colId)
    }
    return this.http.get<PaginacaoResponse<GrupoRubrica>>(`${environment.BASE_URL + this.caminhoApi}?PageSize=${pageSize}&PageIndex=${pageIndex}`, { params }).pipe(
      map(this.jsonDadosToResourcesPaginacao.bind(this)),
      catchError(this.handleError)
    )
  }
}
