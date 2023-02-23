import { Injectable, Injector } from '@angular/core';
import { ServiceBase } from 'src/app/shared/services/servico-base.service';
import { PaginacaoResponse } from 'src/app/shared/models/paginacao-response/paginacao-response.model';
import { catchError, map, Observable } from 'rxjs';
import { Estado } from '../models/cidade-estado/estado.model';
import { environment } from 'src/environments/environment';
import { FilterSelect } from '../components/select-pagination/shared/models/filter-select.model';
import { HttpParams } from '@angular/common/http';
import { IGetRowsParams } from 'ag-grid-community';

@Injectable({
  providedIn: 'root'
})

export class EstadoService extends ServiceBase<Estado> {

  constructor(
    protected override injector: Injector) {
    super(`api/estado`, injector, Estado.fromJson);
  }

  override obterTodosPaginados(pageSize: string, pageIndex: string, filtroSelect: string, selecionadoId?: number): Observable<PaginacaoResponse<Estado>> {
    let params = new HttpParams()
      .set('id', selecionadoId == null ? undefined : selecionadoId)
      .set('nome', filtroSelect == null ? undefined : filtroSelect)

    return this.http.get<PaginacaoResponse<Estado>>(`${environment.BASE_URL + this.caminhoApi}?PageSize=${pageSize}&PageIndex=${pageIndex}`, { params }).pipe(
      map(this.jsonDadosToResourcesPaginacao.bind(this)),
      catchError(this.handleError)
    )
  }
}