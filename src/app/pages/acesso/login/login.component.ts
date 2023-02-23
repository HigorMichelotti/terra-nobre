import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Validators, UntypedFormGroup, UntypedFormBuilder, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { EmitirAlerta } from 'src/app/shared/helpers/sweet-alertas';
import { UsuariosLogado } from '../shared/models/usuario-logado.model';
import { KeyLocalStorage, LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { UsuarioLogadoDadosAcesso } from '../shared/models/usuario-logado-dados-acesso.model';
import { ClaimUsuario } from '../shared/models/claim-usuario.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public formulario = this.formBuilder.group({
    email: ["", [Validators.required]],
    senha: ["", [Validators.required]],
  })

  public carregando: boolean = false;

  constructor(
    protected rota: Router,
    protected activeRota: ActivatedRoute,
    protected formBuilder: FormBuilder,
    protected authService: AuthService,
    protected localStorageService: LocalStorageService
  ) { }

  ngOnInit() {
    this.setarAtributosFormulario()
  }

  public fazerLogin() {
    this.carregando = true;

    this.authService.fazerLogin(this.formulario.value as any).subscribe({
      next: (data: any) => {
        console.log('data', data)
        if (!data) return this.acaoQuandoForError('Usuário ou senha invalidos')
        return this.acaoQuandoForSucesso(data);
      },
      error: (error) => {
        this.carregando = false;
        this.acaoQuandoForError(error)
      }
    })
    // this.authService.fazerLogin(this.formulario.value).subscribe({
    //   next: (data) => this.acaoQuandoForSucesso(data),
    //   error: (error) => {
    //     this.carregando = false;
    //     this.acaoQuandoForError(error)
    //   }
    // })
  }

  protected setarAtributosFormulario() {
    this.formulario
  }

  protected async acaoQuandoForSucesso(dados: UsuariosLogado) {
    this.carregando = false;
    this.localStorageService.set(KeyLocalStorage.Usuario, dados)
    this.rota.navigate(['/admin/propostas']);
  }

  protected acaoQuandoForError(mensagem?: string): UsuariosLogado {
    this.carregando = false;
    return EmitirAlerta.AlertaToastError(mensagem || "Ocorreu um erro ao processar a sua solicitação!");
  }

}
