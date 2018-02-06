import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { URL_SERVICIOS } from '../../config/config';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
// declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios;
  desde = 0;
  totalRegistros = 0;
  cargando = false;

  constructor(
    public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService
  ) {

  }

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUploadService.notificacion
      .subscribe(res => {
        this.cargarUsuarios();
    });
  }

  mostrarModal(id: string) {
    this._modalUploadService.mostrarModal('usuarios', id);
  }

  cargarUsuarios() {
    this.cargando = true;

    this._usuarioService.cargarUsuarios(this.desde)
      .subscribe( (resp: any) => {
        console.log(resp);
        this.totalRegistros = resp.total;
        this.usuarios = resp.usuarios;
        this.cargando = false;
      });
  }


  cambiarDesde( valor: number ) {
    let desde = this.desde + valor;
    console.log(desde);

    if (desde >= this.totalRegistros) {
      return;
    }

    if (desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();

  }



  buscarUsuario(termino: string) {

    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }

    // this.cargando = true;

    this._usuarioService.buscarUsuarios(termino)
      .subscribe((usuarios: Usuario) => {

        this.usuarios = usuarios;
        console.log(usuarios);

      });
  }

  borrarUsuario( usuario: Usuario ) {

    if (usuario._id === this._usuarioService.usuario._id) {
      return;
    }
    console.log(usuario);

    this._usuarioService.borrarUsuario(usuario._id)
      .subscribe(borrado => {
        console.log(borrado);
        this.cargarUsuarios();

      });

    // swal({
    //   title: 'Estas seguro?',
    //   text: 'Estas apunto de borrar a ' + usuario.nombre,
    //   icon: 'warning',
    //   buttons: true,
    //   dangerMode: true,
    // }).then(borrar => {

    //   console.log(borrar);

    // });

  }




  guardarUsuario( usuario: Usuario) {
    this._usuarioService.actualizarUsuario(usuario)
      .subscribe();
  }




}
