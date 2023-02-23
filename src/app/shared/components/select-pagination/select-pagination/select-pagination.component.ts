import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ControlContainer, FormControl, FormGroupDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectComponent, NgSelectModule } from '@ng-select/ng-select';
import { first } from 'rxjs';
import { EmitirAlerta } from 'src/app/shared/helpers/sweet-alertas';
import { PaginacaoResponse } from 'src/app/shared/models/paginacao-response/paginacao-response.model';
import { ServiceBase } from 'src/app/shared/services/servico-base.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  standalone: true,
  imports: [NgSelectModule, ReactiveFormsModule, FormsModule],
  providers: [FormGroupDirective],
  selector: 'app-select-pagination',
  templateUrl: './select-pagination.component.html',
  styleUrls: ['./select-pagination.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective
    }
  ]
})

export class SelectPaginationComponent implements OnInit {

  @ViewChild('select') select: NgSelectComponent

  @Input() selectFormControlName: FormControl;
  @Input() bindValue: string;
  @Input() bindLabel: string;
  @Input() resourceService: ServiceBase<any>;
  @Input() parametroFiltro: string = "";
  @Input() acaoAtual: string;

  @Output() change = new EventEmitter<any>();

  public resourcePaginacao: PaginacaoResponse<any>;
  public carregandoSelect: boolean;
  public inputFilterSelect: string = "";
  public pageIndex: number = 1;
  public timerFilterSelect: any;

  constructor(
    private formularioComponentePai: FormGroupDirective,
  ) { }

  ngOnInit(): void {
    if (this.acaoAtual == "edicao") {
      this.selectFormControlName.valueChanges.pipe(first())
        .subscribe(data => this.obterDados(typeof data == "object" ? data[this.parametroFiltro] : data))
    } else {
      this.obterDados()
    }

    this.resourcePaginacao = new PaginacaoResponse<any>()
    this.detectarResetFormulario();
  }

  obterDados(selecionado?: number) {
    this.carregandoSelect = true;
    this.resourceService.obterTodosPaginados("15", this.pageIndex.toString(), this.inputFilterSelect, selecionado)
      .subscribe({
        next: (data) => {
          this.resourcePaginacao.adicionarDados(data);
        },
        error: (error) => EmitirAlerta.AlertaToastError(error),
        complete: () => this.carregandoSelect = false
      });
  }

  detectarResetFormulario() {
    this.selectFormControlName.valueChanges.subscribe(() => {
      if (this.select.hasValue) return;
      this.select.searchTerm = ""
    })
  }

  onScrollToEnd() {
    if (this.resourcePaginacao.items.length == this.resourcePaginacao.total) return;
    this.pageIndex++;
    this.obterDados();
  }

  filtrar(inputFilter: any) {
    this.pageIndex = 1;
    this.resourcePaginacao = new PaginacaoResponse<any>();
    this.inputFilterSelect = inputFilter.term;

    clearTimeout(this.timerFilterSelect);
    this.timerFilterSelect = setTimeout(() => {
      this.obterDados();
    }, 500);
  }

  limpar() {
    this.pageIndex = 1;
    this.resourcePaginacao = new PaginacaoResponse<any>();
    this.inputFilterSelect = "";
    this.obterDados();
  }

  changeSelect(valor: any) {
    this.change.emit(valor)
  }
}
