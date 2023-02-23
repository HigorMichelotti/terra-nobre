import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { FormPropostaComponent } from './form-proposta/form-proposta.component';

const routes: Routes = [
  {
    path: '',
    component: FormPropostaComponent,
    canActivate: [AuthGuard],
    // data: { claimRequired: 'Usuario.Ler' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropostaRoutingModule { }
