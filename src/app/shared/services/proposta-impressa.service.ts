import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
    providedIn: 'root'
})
export class PropostaImpressaService {

    constructor(protected http: HttpClient) { }

    gerarRelatorio(relatorio: any): void {
        pdfMake.createPdf(relatorio).open();
    }
}
