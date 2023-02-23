import { ModelBase } from '../models/ModelBase';

import { Injector } from '@angular/core';
import { HttpClient, } from '@angular/common/http'

import { environment } from 'src/environments/environment';
import { Observable, throwError, catchError, map } from 'rxjs';
import { IGetRowsParams } from 'ag-grid-community';
import { PaginacaoResponse } from '../models/paginacao-response/paginacao-response.model';

export abstract class ServiceBase<T extends ModelBase> {

    protected http: HttpClient;

    constructor(
        protected caminhoApi: string,
        protected injector: Injector,
        protected jsonDadosToResourceFn: (jsonData: any) => T
    ) {
        this.http = injector.get(HttpClient)
    }

    obterTodos(): Observable<T[]> {
        return this.http.get<T[]>(`${environment.BASE_URL + this.caminhoApi}`).pipe(
            map(this.jsonDadosToResources.bind(this)),
            catchError(this.handleError)
        )
    }

    obterPorId(id: number): Observable<T> {
        return this.http.get<T>(`${environment.BASE_URL + this.caminhoApi}/${id}`).pipe(
            map(this.jsonDadosToResource.bind(this)),
            catchError(this.handleError)
        )
    }

    salvar(resource: T): Observable<T> {
        console.log(resource)
        return this.http.post<T>(`${environment.BASE_URL + this.caminhoApi}`, resource).pipe(
            map(this.jsonDadosToResource.bind(this)),
            catchError(this.handleError)
        )
    }

    atualizar(resource: T): Observable<T> {
        return this.http.put<T>(`${environment.BASE_URL + this.caminhoApi}`, resource).pipe(
            map(() => resource),
            catchError(this.handleError)
        )
    }

    excluir(id: number): Observable<any> {
        return this.http.delete<T>(`${environment.BASE_URL + this.caminhoApi}?id=${id}`).pipe(
            map(() => null),
            catchError(this.handleError)
        )
    }

    // Métodos abstract
    abstract obterTodosPaginados(pageSize: string, pageIndex: string, filtro?: IGetRowsParams | string, selecionadoId?: number): Observable<PaginacaoResponse<T>>;

    // Métodos protected
    protected jsonDadosToResources(jsonDados: Array<any>): Array<T> {
        const resources: Array<T> = [];
        jsonDados.forEach(element => resources.push(this.jsonDadosToResourceFn(element)));
        return resources
    }

    protected jsonDadosToResourcesPaginacao(jsonDados: PaginacaoResponse<T>): PaginacaoResponse<T> {
        if (!jsonDados) {
            jsonDados = new PaginacaoResponse<T>();
            return null;
        }

        let resources: PaginacaoResponse<T> = new PaginacaoResponse<T>();
        resources.adicionarDados(jsonDados);
        resources.items = new Array<T>();
        jsonDados.items.forEach(element => resources.items.push(this.jsonDadosToResourceFn(element)));
        return resources;
    }

    protected jsonDadosToResource(jsonDados: any): T {
        return this.jsonDadosToResourceFn(jsonDados);
    }

    protected handleError(error: any): Observable<any> {
        console.log("ERRO NA REQUISIÇÃO => ", error);
        return throwError(() => error);
    }
}
