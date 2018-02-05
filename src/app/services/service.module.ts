import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';



import {
  SettingsService,
  SidebarService,
  LoginGuardGuard,
  SharedService,
  SubirArchivoService,
  UsuarioService
} from './service.index';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    LoginGuardGuard,
    UsuarioService,
    SubirArchivoService
  ],
  declarations: []
})
export class ServiceModule {}
