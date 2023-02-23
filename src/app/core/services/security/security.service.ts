import { Injectable } from '@angular/core';
import { ClaimUsuario } from 'src/app/pages/acesso/shared/models/claim-usuario.model';
import { AuthService } from '../auth.service';

@Injectable({
    providedIn: 'root'
})

export class SecurityService {
    constructor(
        private authService: AuthService
    ) { }

    hasClaim(claimValue: any): boolean {
        return this.validarClaim(claimValue);
    }

    private validarClaim(claimValue: any): boolean {
        var arrayClaimsUsuario = this.authService.obterDadosUsuario().dadosUsuario.claims

        if (!arrayClaimsUsuario) return false

        if (arrayClaimsUsuario.find(x => x.tipoClaim == "Administrador")) return true;

        if (claimValue == undefined) return false;

        if (typeof claimValue != 'string')
            return this.validarVariasClaims(claimValue, arrayClaimsUsuario)

        var claim = arrayClaimsUsuario.find(c => c.tipoClaim.trim() == claimValue.trim())
        if (claim) return true;

        return false;
    }

    private validarVariasClaims(claimValue: any, arrayClaimsUsuario: Array<ClaimUsuario>): boolean {
        var claimEncontrada: boolean = false
        claimValue.forEach((element: string) => {
            var claim = arrayClaimsUsuario.find(c => c.tipoClaim.trim() == element.trim())
            if (claim) return claimEncontrada = true;

            return null
        });

        return claimEncontrada
    }
}
