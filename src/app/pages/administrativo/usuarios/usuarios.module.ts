import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { FormUsuariosComponent } from './form-usuarios/form-usuarios.component';



@NgModule({
  declarations: [ListaUsuariosComponent, FormUsuariosComponent],
  imports: [
    SharedModule,
    UsuariosRoutingModule,
  ]
})
export class UsuariosModule { }