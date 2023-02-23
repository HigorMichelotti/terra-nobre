import { OnInit, ViewChild, Injector, Directive } from '@angular/core';
import { ModelBase } from 'src/app/shared/models/ModelBase';
import { ServiceBase } from 'src/app/shared/services/servico-base.service';
import { MenuService } from 'src/app/core/services/menu.service';
import { TraducaoAgGrid } from 'src/app/shared/helpers/traducao-ag-grid';
import { BotoesAgGrid, BotoesComponent } from '../../ag-grid-components/botoes/botoes.component';
import { Router } from '@angular/router';
import { EmitirAlerta } from 'src/app/shared/helpers/sweet-alertas';
import { ColDef, GridApi, GridOptions, IGetRowsParams } from 'ag-grid-community';
import { LoadingAgGridComponent } from '../../ag-grid-components/loading-ag-grid/loading-ag-grid.component';
import { NavigationBreadcrumbItem } from 'src/app/shared/interfaces/navigation-breadcrumb';

@Directive()
export abstract class BaseListComponent<T extends ModelBase> implements OnInit {

  public colunasTabela: Array<ColDef>;
  public gridOptions: Partial<GridOptions>;
  public cacheOverflowSize: number;
  public maxConcurrentDatasourceRequests: number;
  public infiniteInitialRowCount: number;
  public definicaoPadraoColunas: ColDef;
  public traducaoAgGrid: any;
  public frameworkComponents: any;
  public loadingOverlayComponent: any;

  public gridContext: any;
  public gridApi: GridApi<T>;
  public gridDadosApi: IGetRowsParams;
  public gridColumnApi: any;

  protected menuService: MenuService;
  protected router: Router

  constructor(
    protected injector: Injector,
    private resourceService: ServiceBase<T>,
    protected jsonDadosToResourceFn: (jsonDados: any) => T,
    public botoesAgGrid: BotoesAgGrid,
  ) {
    this.menuService = this.injector.get(MenuService);
    this.router = this.injector.get(Router);
  }

  ngOnInit() {
    this.configurarAgGrid();
    this.ajustarAgGrid();
    this.definirColunasAgGrid();
  }

  inicializarAgGrid(event: any) {
    this.gridApi = event.api;
    this.gridColumnApi = event.columnApi;

    var datasource = {
      getRows: (params: IGetRowsParams) => {
        this.gridDadosApi = params;
        let pageIndex = (params.endRow / this.gridOptions.paginationPageSize);
        this.obterTodos(pageIndex);
      }
    }

    this.gridApi.setDatasource(datasource);
    this.gridApi.sizeColumnsToFit();
  }

  obterTodos(pageIndex?: number) {
    pageIndex = !pageIndex ? 1 : pageIndex

    this.mostrarCarregandoAgGrid();
    this.resourceService.obterTodosPaginados(this.gridOptions.paginationPageSize.toString(), pageIndex.toString(), this.gridDadosApi)
      .subscribe({
        next: (data) => this.gridDadosApi.successCallback(data ? data.items : [], data ? data.total : 0),
        error: (error) => this.acaoQuandoForError(error),
        complete: () => this.esconderCarregandoAgGrid()
      })
  }

  inicializarDataTable(params: any) {
    this.gridApi = params.api
    this.gridApi.sizeColumnsToFit();
  }

  localAlterado() {
    this.obterTodos()
  }

  ajustarAgGrid() {
    this.menuService.emitirMenuAlterado.subscribe(
      () => this.gridApi.sizeColumnsToFit()
    );
  }

  configurarAgGrid() {
    this.cacheOverflowSize = 2;
    this.maxConcurrentDatasourceRequests = 2;

    this.gridOptions = {
      cacheBlockSize: 15,
      paginationPageSize: 15,
      rowModelType: 'infinite',
    }

    this.definicaoPadraoColunas = {
      resizable: true,
      floatingFilter: true,
      sortable: true,
    };

    this.gridContext = {
      componentParent: this,
      botoesAgGrid: this.botoesAgGrid
    };

    this.traducaoAgGrid = TraducaoAgGrid.Traduzir();
    this.frameworkComponents = {
      customLoadingOverlay: LoadingAgGridComponent,
      childMessageRenderer: BotoesComponent,
    };

    this.loadingOverlayComponent = 'customLoadingOverlay';
  }

  protected excluir(dados: T) {
    this.resourceService.excluir(dados.id).subscribe({
      next: () => {
        this.acaoQuandoForSucesso()
        this.gridApi.onFilterChanged();
      },
      error: () => this.acaoQuandoForError()
    })
  }

  public mostrarCarregandoAgGrid() {
    this.gridApi.showLoadingOverlay();
  }

  public esconderCarregandoAgGrid() {
    this.gridApi.hideOverlay();
  }

  protected acaoQuandoForSucesso(mensagem?: string): T {
    if ((mensagem)) return EmitirAlerta.AlertaToastSuccess(mensagem);
    return EmitirAlerta.AlertaToastSuccess("Solicitação processada com sucesso!")
  }

  protected acaoQuandoForError(mensagem?: string): T {
    this.gridDadosApi?.failCallback();

    if ((mensagem)) return EmitirAlerta.AlertaToastError(mensagem);
    return EmitirAlerta.AlertaToastError("Ocorreu um erro ao processar a sua solicitação!")
  }

  public abstract atribuirParaEditar(dados: T): void;
  public abstract atribuirParaSalvar(): void;

  protected abstract definirColunasAgGrid(): void;
  protected abstract setarBreadcrumb(): NavigationBreadcrumbItem[];
}
