import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToggleFullScreenDirective } from '../shared/full-screen/toggle-full-screen';

/* Menu Items */
import { NavigationItem, NavigationItemService } from './components/layout/admin/navigation/navigation';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { HttpErrorInterceptor } from './services/error-interceptor.service';
import { HttpsRequestInterceptor } from './services/interceptor.service';
import { FiltrarMenuPipe } from './pipes/filtrar-menu.pipe';


@NgModule({
  declarations: [
    ToggleFullScreenDirective,
    FiltrarMenuPipe,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    NavigationItemService,
    { provide: HTTP_INTERCEPTORS, useClass: HttpsRequestInterceptor, multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: function (authService: AuthService) {
        return new HttpErrorInterceptor(authService);
      },
      multi: true,
      deps: [AuthService]
    },
  ],
  exports: [
    // SHARED MODULES
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FiltrarMenuPipe
  ]
})
export class CoreModule { }
