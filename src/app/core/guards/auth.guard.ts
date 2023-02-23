import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { EmitirAlerta } from 'src/app/shared/helpers/sweet-alertas';
import { AuthService } from '../services/auth.service';
import { SecurityService } from '../services/security/security.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private securityService: SecurityService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.existeDadosUsuario()) {
      return this.liberarRotaPorClaim(route);
    } else {
      this.authService.logout();
      return false;
    }
  }

  liberarRotaPorClaim(route: ActivatedRouteSnapshot): boolean {
    if (route.data['claimRequired'] == undefined) return true;
    if (this.securityService.hasClaim("Administrador")) return true;
    if (this.securityService.hasClaim(route.data['claimRequired'])) return true;

    EmitirAlerta.AlertaToastNotificacao("Sem permissão de acesso")
    return false;
  }

}
