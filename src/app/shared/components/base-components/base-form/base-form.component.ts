import { OnInit, Injector, Directive } from '@angular/core';
import { FormBuilder, FormGroup } from "@angular/forms"
import { ActivatedRoute, Router } from "@angular/router"

import { ModelBase } from '../../../models/ModelBase';
import { ServiceBase } from '../../../services/servico-base.service';

import { EmitirAlerta } from 'src/app/shared/helpers/sweet-alertas';
import { finalize, first, Observable, Subject } from 'rxjs';

@Directive()
export abstract class BaseFormComponent<T extends ModelBase> implements OnInit {

  public acaoAtual?: string;
  public cadastrando: boolean;

  public formulario?: FormGroup;

  private resultRequest?: Subject<T> = new Subject<T>();
  public resource: Observable<T> = this.resultRequest.asObservable();

  public tituloPagina?: string;
  public textoBotaoFormulario?: string;
  public carregando: boolean;

  protected activatedRoute: ActivatedRoute;
  protected router: Router;
  protected route: ActivatedRoute;
  protected formBuilder: FormBuilder;

  constructor(
    protected injector: Injector,
    protected resourceService: ServiceBase<T>,
    protected jsonDadosToResourceFn: (jsonDados: any) => T
  ) {
    this.activatedRoute = this.injector.get(ActivatedRoute);
    this.router = this.injector.get(Router);
    this.route = this.injector.get(ActivatedRoute);
    this.formBuilder = this.injector.get(FormBuilder);
  }

  ngOnInit() {
    // this.setarAtributosFormulario();
    this.setAcaoAtual();
  }

  submitFormulario() {
    switch (this.acaoAtual) {
      case 'cadastro': this.salvar(); break;
      case 'edicao': this.atualizar(); break;
    }
  }

  // Métodos protected
  protected setAcaoAtual() {
    this.activatedRoute.params.subscribe((parametro: any) => {
      if (parametro.hasOwnProperty('id')) {
        this.atribuirParaEditar(parametro.id);
      } else {
        this.atribuirParaSalvar();
      }
    });
    console.log(this.acaoAtual)
  }

  protected obterPorId(dados: any) {
    if (this.acaoAtual == "edicao") {
      this.resourceService.obterPorId(dados)
        .pipe(first())
        .subscribe({
          next: (resource) => {
            this.resultRequest.next(resource)
          },
          error: (err) => this.acaoQuandoForError(err)
        })
    }
  }

  protected setarTipoDaPagina(acaoAtual: string) {
    switch (acaoAtual) {
      case 'cadastro':
        this.cadastrando = true;
        this.acaoAtual = 'cadastro';
        this.tituloPagina = this.tituloPaginaCadastrar();
        this.textoBotaoFormulario = this.textoBotaoCadastrar();

        break;
      case 'edicao':
        this.cadastrando = false;
        this.acaoAtual = 'edicao';
        this.tituloPagina = this.tituloPaginaEditar();
        this.textoBotaoFormulario = this.textoBotaoEditar();
        break;
    }
  }

  protected tituloPaginaCadastrar(): string {
    return "Cadastrar";
  }

  protected tituloPaginaEditar(): string {
    return "Editar";
  }

  protected textoBotaoCadastrar(): string {
    return "Salvar";
  }

  protected textoBotaoEditar(): string {
    return "Alterar";
  }

  protected salvar() {
    this.carregando = true;

    const resource: T = this.jsonDadosToResourceFn(this.formulario?.value);

    this.resourceService.salvar(this.formulario?.value)
      .pipe(finalize(() => {
        this.carregando = !this.carregando
      }))
      .subscribe({
        next: () => {
          this.acaoQuandoForSucesso()
          this.router.navigate(['../'], { relativeTo: this.route });
        },
        error: (err) => this.acaoQuandoForError(err),
      })
  }

  protected atualizar() {
    this.carregando = true;

    const resource: T = this.jsonDadosToResourceFn(this.formulario?.value);

    this.resourceService.atualizar(this.formulario?.value).subscribe({
      next: () => {
        this.acaoQuandoForSucesso()
        console.log(this.route)
        this.router.navigate(['../../'], { relativeTo: this.route });
      },
      error: () => this.acaoQuandoForError(),
      complete: () => this.carregando = false
    })
  }

  protected atribuirParaEditar(dados: T) {
    console.log('atribuirParaEditar = id:', dados);
    this.setarTipoDaPagina('edicao');
    this.obterPorId(dados);
  }

  protected atribuirParaSalvar() {
    this.setarTipoDaPagina('cadastro');
    this.formulario?.reset();
  }

  protected acaoQuandoForSucesso(mensagem?: string): any {
    if (mensagem) return EmitirAlerta.AlertaToastSuccess(mensagem);
    return EmitirAlerta.AlertaToastSuccess("Solicitação processada com sucesso!")
  }

  protected acaoQuandoForError(mensagem?: string): T {
    if (mensagem) return EmitirAlerta.AlertaToastError(mensagem);
    return EmitirAlerta.AlertaToastError("Ocorreu um erro ao processar a sua solicitação!")
  }

  protected abstract setarBreadcrumb(): void;
}
