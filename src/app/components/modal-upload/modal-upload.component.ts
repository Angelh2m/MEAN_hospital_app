import { Component, OnInit } from '@angular/core';
import { SubirArchivoService } from '../../services/subir-archivo/subir-archivo.service';
import { ModalUploadService } from './modal-upload.service';

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  imagenSubir: File;
  imagenTemp: string;


  constructor(
    public _subirArchivoService: SubirArchivoService,
    public _modalUploadService: ModalUploadService

  ) { }


  cerrarModal() {
    this.imagenTemp = null;
    this.imagenSubir = null;
    this._modalUploadService.ocultarModal();
  }

  seleccionImagen( archivo: File ) {

    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }

    if ( archivo.type.indexOf('image') < 0) {
      console.log('No es una imagen');
      this.imagenSubir = null;
      return;
    }

    // console.log(archivo);

    this.imagenSubir = archivo;

    const reader = new FileReader();
    const urlImageTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imagenTemp = reader.result ;

  }

  subirImagen() {

    this._subirArchivoService
      .subirArchivo(this.imagenSubir,
      this._modalUploadService.tipo,
      this._modalUploadService.id
    ).then(res => {

        console.log(res);

        this._modalUploadService.notificacion.emit(res);
        // this._modalUploadService.ocultarModal();
      this.cerrarModal();

      })
      .catch(err => {
        console.log('Error en la carga');

      });

  }


  ngOnInit() {
    console.log('modal listo');
  }

}
