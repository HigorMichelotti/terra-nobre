import { Component, Injector, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { BaseFormComponent } from 'src/app/shared/components/base-components/base-form/base-form.component';
import { Status } from 'src/app/shared/enums/status.enum';
import { HelperUpload } from 'src/app/shared/helpers/helper-upload';
import { NavigationBreadcrumbItem } from 'src/app/shared/interfaces/navigation-breadcrumb';
import { ClaimNivelAcesso } from 'src/app/shared/models/usuario/claim-nivel-acesso.model';
import { Roles } from 'src/app/shared/models/usuario/roles.model';
import { ClaimService } from 'src/app/shared/services/claim.service';
import { Usuario } from '../shared/models/usuario.model';
import { UsuarioService } from '../shared/usuario.service';

@Component({
  selector: 'app-form-usuarios',
  templateUrl: './form-usuarios.component.html',
  styleUrls: ['./form-usuarios.component.scss']
})
export class FormUsuariosComponent extends BaseFormComponent<Usuario> implements OnInit {

  override formulario = this.formBuilder.group({
    id: [null],
    nome: ["", Validators.required],
    email: ["", Validators.required],
    role: [null],
    ativo: [true]
  })

  public arrayRole: Array<Roles>;
  public arrayStatus: Array<Status>;

  constructor(
    protected override injector: Injector,
    private usuarioService: UsuarioService,
  ) {
    super(injector, usuarioService, Usuario.fromJson)
  }

  override ngOnInit() {
    super.ngOnInit();
  }

  protected override atribuirParaEditar(dados: Usuario): void {
    super.atribuirParaEditar(dados);
    this.resource.pipe(first())
      .subscribe((usuario: Usuario) => {
        this.formulario.patchValue(usuario)
      })
  }

  public setarBreadcrumb(): NavigationBreadcrumbItem[] {
    return [
      { texto: 'Administração' },
      { texto: 'Usuários', link: '/admin/usuarios' },
      { texto: `${this.tituloPagina} usuários` }
    ]
  }
}