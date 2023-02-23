import { Injectable, Injector } from '@angular/core';
import { ServiceBase } from 'src/app/shared/services/servico-base.service';
import { PaginacaoResponse } from 'src/app/shared/models/paginacao-response/paginacao-response.model';
import { catchError, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpParams } from '@angular/common/http';
import { Sexo } from '../models/sexo/sexo.model';

@Injectable({
  providedIn: 'root'
})

export class SexoService extends ServiceBase<Sexo> {

  constructor(
    protected override injector: Injector) {
    super(`api/sexo`, injector, Sexo.fromJson);
  }

  override obterTodosPaginados(pageSize: string, pageIndex: string, filtroSelect: string): Observable<PaginacaoResponse<Sexo>> {
    let params = new HttpParams()
      .set('nome', filtroSelect == null ? undefined : filtroSelect)

    return this.http.get<PaginacaoResponse<Sexo>>(`${environment.BASE_URL + this.caminhoApi}?PageSize=${pageSize}&PageIndex=${pageIndex}`, { params }).pipe(
      map(this.jsonDadosToResourcesPaginacao.bind(this)),
      catchError(this.handleError)
    )
  }
}