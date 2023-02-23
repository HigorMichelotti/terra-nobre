import { Component, OnInit } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { MenuService } from 'src/app/core/services/menu.service';
import { NavigationItemService } from '../../navigation/navigation';
import { NavigationItem } from '../../navigation/navigation-default';
import { EmitirAlerta } from 'src/app/shared/helpers/sweet-alertas';
import { LocationStrategy } from '@angular/common';

@Component({
  selector: 'app-nav-right',
  templateUrl: './nav-right.component.html',
  styleUrls: ['./nav-right.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavRightComponent implements OnInit {

  public nomeUsuarioLogado: string;
  public nomeUsuarioCompleto: string;
  public emailUsuario: string;

  public filtroMenu: string;
  public arrayMenus: Array<NavigationItem>
  public arrayMenusFavoritados: Array<NavigationItem>
  public nomeMenu: string = 'Favoritos'

  constructor(
    protected rota: Router,
    protected authService: AuthService,
    protected navigationItemService: NavigationItemService,
    private location: LocationStrategy
  ) { }

  ngOnInit() {
    this.nomeUsuarioLogado = "";
    this.setarDados();
  }

  marcar() {
    setTimeout(() => {
      const sections = document.querySelectorAll('.div-icone');

      for (let i = 0; i < sections.length; i++) {
        sections[i].classList.remove('active-icon');
      }

      let current_url = this.location.path();
      const link = "a.div-icone[ href='" + current_url + "' ]";
      const ele = document.querySelector(link);
      if (!ele) return;

      ele.classList.add('active-icon')
    }, 100)
  }

  async fazerLogout() {
    return await this.authService.logout();
  }

  async setarDados() {
    this.nomeUsuarioCompleto = this.authService.obterDadosUsuario().dadosUsuario.nome;
    this.emailUsuario = this.authService.obterDadosUsuario().dadosUsuario.email;
    this.nomeUsuarioLogado = `Nome`;
  }

}
