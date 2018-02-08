import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import 'rxjs/add/operator/map';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from '../../models/medico.model';

@Injectable()
export class MedicoService {

  totalMedicos = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarMedicos() {
    const url = `${URL_SERVICIOS}/medico`;

    return this.http.get(url)
      .map( (res: any) => {
        this.totalMedicos = res.total;
        return res.medicos;
      });
  }


  cargarMedico(id: string) {
    const url = `${URL_SERVICIOS}/medico/${id}`;

    return this.http.get(url)
      .map((res: any) => {
        return res.medico;
      });
  }


  buscarMedicos(termino: string) {

    const url = `${URL_SERVICIOS}/busqueda/coleccion/medicos/${termino}`;
    return this.http.get(url).map( (res: any) => res.medicos );

  }

  borrarMedico(id: string) {
    const url = `${URL_SERVICIOS}/medico/${id}/?token=${this._usuarioService.token}`;

    return this.http.delete(url)
      .map( (res: any) => {

        console.log('Borrado');

        return res;
      });

  }

  guardarMedico(medico: Medico) {

    const url = `${URL_SERVICIOS}/medico/?token=${this._usuarioService.token}`;

    return this.http.post(url, medico)
      .map((res: any) => {
        console.log(res);
        return res.medico;
      });
  }



}
