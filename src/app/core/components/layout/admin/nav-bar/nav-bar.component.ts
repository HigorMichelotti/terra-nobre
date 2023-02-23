import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppConfig } from '../../../../../app-config';
import { MenuService } from 'src/app/core/services/menu.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  public nextConfig: any;
  public menuClass: boolean;
  public collapseStyle: string;
  public windowWidth: number;

  @Output() onNavCollapse = new EventEmitter();
  @Output() onNavHeaderMobCollapse = new EventEmitter();

  constructor(protected menuService: MenuService) {
    this.nextConfig = AppConfig.config;
    this.menuClass = false;
    this.collapseStyle = 'none';
    this.windowWidth = window.innerWidth;
  }

  ngOnInit() { }

  toggleMobOption() {
    this.menuClass = !this.menuClass;
    this.collapseStyle = (this.menuClass) ? 'block' : 'none';
  }

  navCollapse() {
    if (this.windowWidth >= 992) {

      this.onNavCollapse.emit();
      setTimeout(() => {
        this.dispararEventoMenuAlterado();
      }, 300);

    } else {
      this.onNavHeaderMobCollapse.emit();
    }
  }

  dispararEventoMenuAlterado() {
    this.menuService.emitirMenuAlterado.emit();
  }

}
