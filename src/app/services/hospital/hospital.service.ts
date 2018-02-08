import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Hospital } from '../../models/hospital.model';
// import swal from 'sweetalert';
// import * as swal from 'sweetalert';
// declare var swal: any;
import 'rxjs/add/operator/map';


@Injectable()
export class HospitalService {

  totalHospitales = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarHospitales() {
    const url = URL_SERVICIOS + '/hospital';
    return this.http.get(url)
      .map((res: any) => {

        // console.log(res.hospitales);

        this.totalHospitales = res.total;
        return res.hospitales;
      });
  }

  obtenerHospital(id: string) {

    const url = URL_SERVICIOS + '/hospital/' + id;

      return this.http.get(url)
       .map( (res: any) => res.hospital);
  }




  borrarHospital(id: string) {

    let url = `${URL_SERVICIOS}/hospital/${id}/?token=${this._usuarioService.token}`;

    return this.http.delete(url)
      .map(resp => resp);
  }


  crearHospital( nombre: string) {

    const url = `${URL_SERVICIOS}/hospital/?token=${this._usuarioService.token}`;

    return this.http.post(url, { nombre })
      .map((resp: any) => {
        return resp.hospital;
      });
  }

  buscarHospital(termino: string) {
    const url = `${URL_SERVICIOS}/busqueda/coleccion/hospitales/${termino}`;

    return this.http.get(url).map( (res: any) => res.hospitales );

  }


  actualizarHospital(hospital: Hospital) {
    const url = `${URL_SERVICIOS}/hospital/${hospital._id}/?token=${this._usuarioService.token}`;

    return this.http.put(url, hospital)
      .map((resp: any) => {
        // swal('Hospital Actualizado', hospital.nombre, 'success');
        return resp.hospital;
      });
  }


}
