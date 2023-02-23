import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { FormUsuariosComponent } from './form-usuarios/form-usuarios.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';


const routes: Routes = [
  {
    path: '',
    component: ListaUsuariosComponent,
    canActivate: [AuthGuard],
    // data: { claimRequired: 'Usuario.Ler' }
  },
  {
    path: 'cadastrar',
    component: FormUsuariosComponent,
    canActivate: [AuthGuard],
    // data: { claimRequired: 'Usuario.Cadastrar' }
  },
  {
    path: 'editar/:id',
    component: FormUsuariosComponent,
    canActivate: [AuthGuard],
    // data: { claimRequired: 'Usuario.Editar' }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
