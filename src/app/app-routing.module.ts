import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './core/components/layout/admin/admin.component';
import { AuthComponent } from './core/components/layout/auth/auth.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    loadChildren: () => import('./pages/acesso/acesso.module').then(module => module.AcessoModule)
  },
  {
    path: 'acesso',
    component: AuthComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/acesso/acesso.module').then(module => module.AcessoModule)
      }
    ]
  },
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'propostas',
        loadChildren: () => import('./pages/administrativo/proposta/proposta.module').then(module => module.PropostaModule)
      },
      {
        path: 'usuarios',
        loadChildren: () => import('./pages/administrativo/usuarios/usuarios.module').then(module => module.UsuariosModule)
      },
    ]
  },

  // Rotas para Outro Modulo Aqui
  // Exemplo abaixo (Modulo UsuarioFinal):
  // {
  //   path: 'cliente',
  //   component: AdminComponent,
  //   children: [
  //     {
  //       path: 'dashboard',
  //       loadChildren: () => import('./pages/usuario-final/dashboard/dashboard.module').then(module => module.DashboardModule)
  //     },
  //   ]
  // },

  {
    path: '**',
    loadChildren: () => import('./pages/manutencao/maintenance.module').then(module => module.MaintenanceModule)
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
