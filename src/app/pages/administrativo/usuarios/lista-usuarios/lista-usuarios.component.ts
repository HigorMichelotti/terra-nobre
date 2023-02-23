import { Component, OnInit, Injector, ViewChild } from '@angular/core';
import { Usuario } from '../shared/models/usuario.model';
import { BaseListComponent } from 'src/app/shared/components/base-components/base-list/base-list.component';
import { UsuarioService } from '../shared/usuario.service';
import { MenuService } from 'src/app/core/services/menu.service';
import { NavigationBreadcrumbItem } from 'src/app/shared/interfaces/navigation-breadcrumb';

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.scss']
})
export class ListaUsuariosComponent extends BaseListComponent<Usuario> implements OnInit {
  constructor(
    protected override injector: Injector,
    protected override menuService: MenuService,
    protected cargoService: UsuarioService,
  ) {
    super(injector, cargoService, Usuario.fromJson, { btnEditar: true, btnExcluir: true });
  }

  override ngOnInit() {
    super.ngOnInit();
  }

  protected definirColunasAgGrid() {
    this.colunasTabela = [
      {
        headerName: 'Nome',
        field: 'nome',
        suppressMenu: true,
        suppressSizeToFit: false,
        filter: true,
        width: 200
      },
      {
        headerName: 'Ações',
        cellRenderer: "childMessageRenderer",
        suppressFiltersToolPanel: true,
        suppressSizeToFit: false,
        width: 50
      }
    ]
  }

  public override atribuirParaSalvar() {
    this.router.navigate(['admin/usuarios/cadastrar']);
  }

  public override atribuirParaEditar(dados: Usuario) {
    this.router.navigate([`admin/usuarios/editar/${dados.id}`]);
  }

  public setarBreadcrumb(): NavigationBreadcrumbItem[] {
    return [
      { texto: 'Administração' },
      { texto: 'Usuarios' },
    ]
  }
}
