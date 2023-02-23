import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropostaRoutingModule } from './proposta-routing.module';
import { FormPropostaComponent } from './form-proposta/form-proposta.component'
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    FormPropostaComponent
  ],
  imports: [
    SharedModule,
    PropostaRoutingModule
  ]
})
export class PropostaModule { }
