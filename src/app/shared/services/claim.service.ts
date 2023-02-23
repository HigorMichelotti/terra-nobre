import { Injectable, Injector } from '@angular/core';
import { IGetRowsParams } from 'ag-grid-community';
import { catchError, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaginacaoResponse } from '../models/paginacao-response/paginacao-response.model';
import { ClaimNivelAcesso } from '../models/usuario/claim-nivel-acesso.model';
import { ServiceBase } from './servico-base.service';

@Injectable({
    providedIn: 'root'
})
export class ClaimService extends ServiceBase<ClaimNivelAcesso> {
    constructor(
        protected override injector: Injector) {
        super(`api/claims`, injector, ClaimNivelAcesso.fromJson);
    }

    obterPorUsuario(usuarioId: number): Observable<ClaimNivelAcesso[]> {
        return this.http.get<ClaimNivelAcesso[]>(`${environment.BASE_URL + this.caminhoApi}/usuario/${usuarioId}`).pipe(
            map(this.jsonDadosToResources.bind(this)),
            catchError(this.handleError)
        )
    }

    obterTodosPaginados(pageSize: string, pageIndex: string, filtro: string | IGetRowsParams, selecionadoId?: number): Observable<PaginacaoResponse<ClaimNivelAcesso>> {
        throw new Error('Method not implemented.');
    }
}