import { Injectable, Injector } from '@angular/core';
import { ServiceBase } from 'src/app/shared/services/servico-base.service';
import { PaginacaoResponse } from 'src/app/shared/models/paginacao-response/paginacao-response.model';
import { catchError, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cidade } from '../models/cidade-estado/cidade.model';
import { IGetRowsParams } from 'ag-grid-community';
import { HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class CidadeService extends ServiceBase<Cidade> {


    constructor(
        protected override injector: Injector) {
        super(`api/cidade`, injector, Cidade.fromJson);
    }

    obterPorEstadoId(estadoId: string, pageSize: string, pageIndex: string, filtroSelect: string): Observable<PaginacaoResponse<Cidade>> {
        let params = new HttpParams()
            .set('nome', filtroSelect == null ? undefined : filtroSelect)

        return this.http.get<PaginacaoResponse<Cidade>>(`${environment.BASE_URL + this.caminhoApi}/estado/${estadoId}?PageSize=${pageSize}&PageIndex=${pageIndex}`, { params }).pipe(
            map(this.jsonDadosToResourcesPaginacao.bind(this)),
            catchError(this.handleError)
        )
    }

    obterTodosPaginados(pageSize: string, pageIndex: string, parametrosTabela?: IGetRowsParams): Observable<PaginacaoResponse<Cidade>> {
        throw new Error('Method not implemented.');
    }
}