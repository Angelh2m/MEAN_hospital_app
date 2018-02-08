import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';



import {
  SettingsService,
  SidebarService,
  LoginGuardGuard,
  SharedService,
  SubirArchivoService,
  HospitalService,
  UsuarioService,
  MedicoService
} from './service.index';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    MedicoService,
    SharedService,
    LoginGuardGuard,
    UsuarioService,
    HospitalService,
    SubirArchivoService,
    ModalUploadService
  ],
  declarations: []
})
export class ServiceModule {}
