import { Injectable, Injector } from '@angular/core';
import { ServiceBase } from 'src/app/shared/services/servico-base.service';
import { PaginacaoResponse } from 'src/app/shared/models/paginacao-response/paginacao-response.model';
import { catchError, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpParams } from '@angular/common/http';
import { IGetRowsParams } from 'ag-grid-community';
import { StatusLancamento } from '../models/StatusLancamento';

@Injectable({
  providedIn: 'root'
})
export class StatusLancamentoService  extends ServiceBase<StatusLancamento> {

  constructor(
    protected override injector: Injector) {
    super(`api/status-lancamentos`, injector, StatusLancamento.fromJson);
  }

  override obterTodosPaginados(pageSize: string, pageIndex: string): Observable<PaginacaoResponse<StatusLancamento>> {
    return this.http.get<PaginacaoResponse<StatusLancamento>>(`${environment.BASE_URL + this.caminhoApi}?PageSize=${pageSize}&PageIndex=${pageIndex}`).pipe(
      map(this.jsonDadosToResourcesPaginacao.bind(this)),
      catchError(this.handleError)
    )
  }
}
