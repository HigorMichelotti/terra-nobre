import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgSelectModule } from '@ng-select/ng-select';

import { AlertModule, BreadcrumbModule, CardModule, ModalModule } from '../shared/components';
import { DataFilterPipe } from '../shared/components/data-table/data-filter.pipe';
import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ClickOutsideModule } from 'ng-click-outside';

import { SpinnerComponent } from '../shared/components/spinner/spinner.component';
import { ApexChartComponent } from '../shared/components/chart/apex-chart/apex-chart.component';
import { ApexChartService } from '../shared/components/chart/apex-chart/apex-chart.service';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AgGridModule } from 'ag-grid-angular';
import { NgbProgressbarModule, NgbDropdownModule, NgbTooltipModule, NgbCollapseModule, NgbPopoverModule, NgbNavModule, NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { BotoesComponent } from './components/ag-grid-components/botoes/botoes.component';
import { LabelComponent } from './components/ag-grid-components/label/label.component';
import { AccordionModule } from 'primeng/accordion';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { TabViewModule } from 'primeng/tabview';
import { ProgressUploadComponent } from './components/progress-upload/progress-upload.component';
import { SelectPaginationComponent } from './components/select-pagination/select-pagination/select-pagination.component';
import { UploadComponent } from './components/upload/upload.component';
import { GuidedTourModule, GuidedTourService } from 'ngx-guided-tour';
import { NgxCurrencyModule, CurrencyMaskInputMode } from "ngx-currency";

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

export const customCurrencyMaskConfig = {
  align: "right",
  allowNegative: false,
  allowZero: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: ".",
  nullable: false,
  inputMode: CurrencyMaskInputMode.FINANCIAL
}

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    FormsModule,
    NgSelectModule,
    AlertModule,
    CardModule,
    BreadcrumbModule,
    ModalModule,
    ClickOutsideModule,
    NgbProgressbarModule,
    NgxMaskModule.forRoot(options),
    AgGridModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbCollapseModule,
    AccordionModule,
    NgbPopoverModule,
    NgbNavModule,
    TabViewModule,
    SelectPaginationComponent,
    GuidedTourModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig)
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    PerfectScrollbarModule,
    FormsModule,
    NgSelectModule,
    AlertModule,
    CardModule,
    BreadcrumbModule,
    ModalModule,
    DataFilterPipe,
    ClickOutsideModule,
    SpinnerComponent,
    ApexChartComponent,
    AgGridModule,
    NgxMaskModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbCollapseModule,
    AccordionModule,
    NgbPopoverModule,
    NgbNavModule,
    TabViewModule,
    ProgressUploadComponent,
    UploadComponent,
    SelectPaginationComponent,
    GuidedTourModule,
    NgxCurrencyModule
    // NgbAccordionModule,
  ],
  declarations: [
    DataFilterPipe,
    SpinnerComponent,
    ApexChartComponent,
    BotoesComponent,
    LabelComponent,
    ProgressUploadComponent,
    UploadComponent,
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    ApexChartService,
    GuidedTourService
  ]
})
export class SharedModule { }