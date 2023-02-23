import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment';
import { NavegacaoAdministracao } from './rotas-menu-navegacao/navegacao-admin';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  favorited?: boolean;
  children?: Navigation[];
  superiorId?: number;
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

let navigationItems: any[] = [];

@Injectable()
export class NavigationItemService {

  private caminhoApi = "api/menu-navegacao"

  constructor(
    protected authService: AuthService,
    protected httpClient: HttpClient
  ) { }

  private regrasNivelAdministrador(dados: any) {
    navigationItems = [...navigationItems, NavegacaoAdministracao];
  }

  private permissaoDeRotas() {
    navigationItems = [];
    const dadosUsuarioLogado = {};
    this.regrasNivelAdministrador(dadosUsuarioLogado);
  }

  public get() {
    this.permissaoDeRotas();
    return navigationItems;
  }
}
