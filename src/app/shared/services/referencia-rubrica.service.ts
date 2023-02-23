import { HttpParams } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { IGetRowsParams } from 'ag-grid-community';
import { Observable, map, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginacaoResponse } from '../models/paginacao-response/paginacao-response.model';
import { ReferenciaRubrica } from '../models/ReferenciaRubrica';
import { ServiceBase } from './servico-base.service';

@Injectable({
  providedIn: 'root'
})
export class ReferenciaRubricaService extends ServiceBase<ReferenciaRubrica> {

  constructor(
    protected override injector: Injector) {
    super(`api/referencia-rubricas`, injector, ReferenciaRubrica.fromJson);
  }

  override obterTodosPaginados(pageSize: string, pageIndex: string, filtro: IGetRowsParams | string, selecionadoId: number): Observable<PaginacaoResponse<ReferenciaRubrica>> {
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
    return this.http.get<PaginacaoResponse<ReferenciaRubrica>>(`${environment.BASE_URL + this.caminhoApi}?PageSize=${pageSize}&PageIndex=${pageIndex}`, { params }).pipe(
      map(this.jsonDadosToResourcesPaginacao.bind(this)),
      catchError(this.handleError)
    )
  }
}
