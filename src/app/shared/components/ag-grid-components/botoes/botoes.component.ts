import { Component, AfterViewInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { AuthService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-botoes',
  templateUrl: './botoes.component.html',
  styleUrls: ['./botoes.component.scss']
})
export class BotoesComponent implements ICellRendererAngularComp, AfterViewInit {

  public botoesAgGrid: BotoesAgGrid = new BotoesAgGrid();
  public params: any;

  constructor() { }

  agInit(params: any): void {
    this.params = params;
  }

  ngAfterViewInit() {
    this.botoesAgGrid = this.params.context.botoesAgGrid;
  }

  atribuirParaEditar() {
    this.params.context.componentParent.atribuirParaEditar(this.params.node.data)
  }

  atribuirParaVisualizar() {
    this.params.context.componentParent.atribuirParaVisualizar(this.params.node.data)
  }

  atribuirParaVisualizarCronologia(){
    this.params.context.componentParent.atribuirParaVisualizarCronologia(this.params.node.data)
  }

  excluir() {
    Swal.fire({
      title: 'Excluir',
      text: "Realmente deseja excluir?",
      icon: 'warning',
      showCancelButton: true,
      focusCancel: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, deletar!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.params.context.componentParent.excluir(this.params.node.data)
      }
    })
  }

  refresh(): boolean {
    return false;
  }
}

export class BotoesAgGrid {
  public btnVisualizar?: boolean;
  public btnEditar?: boolean;
  public btnExcluir?: boolean;
  public btnCronologia?: boolean;
}