import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';
import { Router } from '@angular/router';


@Injectable()
export class LoginGuardGuard implements CanActivate {

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router;
  ) {

  }

  canActivate(): boolean {
    // Si el token esta disponible
    if (this._usuarioService.estaLogeado() ) {
      console.log('Paso por el login guard');
      return true;
    } else {
      console.log('Bloqueado por el guard');
      this.router.navigate( ['/login'] );
      return false;
    }

  }
}
