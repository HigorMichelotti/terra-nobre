import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { MaintenErrorComponent } from './mainten-error/mainten-error.component';

@NgModule({
  imports: [
    CommonModule,
    MaintenanceRoutingModule
  ],
  declarations: [MaintenErrorComponent],
})
export class MaintenanceModule { }
