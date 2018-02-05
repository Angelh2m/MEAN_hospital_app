import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})



export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: string;


  constructor(
    public _usuarioService: UsuarioService

  ) {

    this.usuario = this._usuarioService.usuario;
  }

  guardar( usuario: Usuario ) {

    console.log(usuario);
    this.usuario.nombre = usuario.nombre;

    if ( !this.usuario.google ) {
      this.usuario.email = usuario.email;
    }

    // this.usuario.email = usuario.email;


    this._usuarioService.actualizarUsuario( this.usuario )
        .subscribe();


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

    const reader = new FileReader();
    const urlImageTemp = reader.readAsDataURL( archivo );

    reader.onloadend = () => this.imagenTemp = reader.result ;

  }

  cambiarImagen() {
    this._usuarioService.cambiarImagen( this.imagenSubir, this.usuario._id );
  }


  ngOnInit() {

  }

}
