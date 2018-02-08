import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagesPipe implements PipeTransform {



  transform(img: string, tipo: string = 'usuarios'): any {

    let url = URL_SERVICIOS + '/img';

    if ( !img ) {
      return url + '/usuarios/xxx';
    }

    if ( img.indexOf('https') >= 0 ) {
      // return img;
      return img;
    }

    // let img = './uploads/usuarios/5a7627037ee1adbefa6a560e-991.jpg';

    function lastSegment( image: any ) {
      const count =  image.split('/');
      return count[count.length - 1];
    }




    if (tipo === 'usuario') {
      // console.log(lastSegment(img + 'THere is an imagge'));

      return url += '/usuarios/' + lastSegment(img);
    }

    // http://localhost:3000/img/hospitales/5a7b1ae8c9cfc3360ed2a1eb-224.jpg


    if (tipo === 'hospital') {
      return url += '/hospitales/' + lastSegment(img);
    }

    if (tipo === 'medico') {
      return url += '/medicos/' + lastSegment(img);
    }

    // switch ( tipo ) {

    //   case 'usuarios':
    //     url += '/usuarios/' + lastSegment(img);
    //   break;

    //   case 'usuario':
    //     url += '/usuarios/' + lastSegment(img);
    //   break;

    //   case 'medico':
    //     url += '/medicos/' + img;
    //   break;

    //   case 'hospital':
    //     url += '/hospitales/' + img;
    //   break;

    //   default:
    //     url += '/usuarios/xxx';
    // }


    return  ;
  }

}
