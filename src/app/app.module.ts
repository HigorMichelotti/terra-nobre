import { NgModule } from '@angular/core';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AuthComponent } from './core/components/layout/auth/auth.component';

import { AdminComponent } from './core/components/layout/admin/admin.component';
import { NavigationComponent } from './core/components/layout/admin/navigation/navigation.component';
import { NavContentComponent } from './core/components/layout/admin/navigation/nav-content/nav-content.component';
import { NavGroupComponent } from './core/components/layout/admin/navigation/nav-content/nav-group/nav-group.component';
import { NavCollapseComponent } from './core/components/layout/admin/navigation/nav-content/nav-collapse/nav-collapse.component';
import { NavItemComponent } from './core/components/layout/admin/navigation/nav-content/nav-item/nav-item.component';
import { NavBarComponent } from './core/components/layout/admin/nav-bar/nav-bar.component';
import { NavLeftComponent } from './core/components/layout/admin/nav-bar/nav-left/nav-left.component';
import { NavSearchComponent } from './core/components/layout/admin/nav-bar/nav-left/nav-search/nav-search.component';
import { NavRightComponent } from './core/components/layout/admin/nav-bar/nav-right/nav-right.component';
import { ConfigurationComponent } from './core/components/layout/admin/configuration/configuration.component';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    AdminComponent,
    NavigationComponent,
    NavContentComponent,
    NavGroupComponent,
    NavCollapseComponent,
    NavItemComponent,
    NavBarComponent,
    NavLeftComponent,
    NavSearchComponent,
    NavRightComponent,
    ConfigurationComponent,
  ],
  imports: [
    CoreModule,
    SharedModule,
    AppRoutingModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
