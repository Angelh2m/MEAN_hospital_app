import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/hospital/hospital.service';

import * as swal from 'sweetalert';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';


@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {
  hospitales: Hospital;

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
  ) { }

  ngOnInit() {
    this.cargarHospitales();

    this._modalUploadService.notificacion
      .subscribe(() => this.cargarHospitales());
  }

  buscarHospital(termino: string) {

    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }

    this._hospitalService
      .buscarHospital(termino)
      .subscribe(res => (this.hospitales = res));
  }

  cargarHospitales() {
    this._hospitalService
      .cargarHospitales()
      .subscribe((hospitales: any) => (this.hospitales = hospitales));
  }

  guardarHospital(hospital: Hospital) {

    this._hospitalService.actualizarHospital(hospital)
      .subscribe();
  }

  borrarHospital(hospital: Hospital) {

    console.log(hospital._id);


    this._hospitalService.borrarHospital(hospital._id)
      .subscribe(() => this.cargarHospitales() );
  }


  crearHospital() {
    swal({
      title: 'crear hospital',
      text: 'Ingresar Hospital'
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true,

    }).then((valor: string) => {

      if (!valor || valor.length === 0) {
        return;
      }

      this._hospitalService.crearHospital(valor)
        .subscribe(() => this.cargarHospitales());

    });
  }


  actualizarImagen(hospital: Hospital) {
    this._modalUploadService.mostrarModal('hospitales', hospital._id);

  }

}
