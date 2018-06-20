import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../user/user.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVER } from '../../config/config';
import { Cotizacion } from '../../models/cotizacion.model';

@Injectable()
export class CotizacionService {

  constructor(
    public _userService: UserService,
    public http: HttpClient,
    public router: Router
  ) { }

  getCotizaciones() {
    let url = URL_SERVER + '/cotizacion?token=' + this._userService.token;

    return this.http.get(url)
      .map( (res: any) => {
        return res;
      })
      .catch( err => {
        if ( err.status === 401 ) {
          swal('¡Cuidado!', 'Ha expirado su sesión, vuelva a ingresar', 'info');
          this._userService.logout();
          this.router.navigate(['/login']);       
          return Observable.throw(err);
        } else { 
          swal('¡Error!', 'Error al obtener datos', 'error');
          return Observable.throw(err);
        }
      });
      
  }

  getCotizacionById( cotizacion: Cotizacion ) {
    let url = URL_SERVER + '/cotizacion/' + cotizacion._id + '?token=' + this._userService.token;

    return this.http.get(url)
      .map( (res: any) => {
        return res;
      })
      .catch( err => {
        if ( err.status === 401 ) {
          swal('¡Cuidado!', 'Ha expirado su sesión, vuelva a ingresar', 'info');
          this._userService.logout();
          this.router.navigate(['/login']);       
          return Observable.throw(err);
        } else { 
          swal('¡Error!', 'Error al obtener datos', 'error');
          return Observable.throw(err);
        }
      });
      
  }

  getCotizacionesUser( id: string ) {
    let url = URL_SERVER + '/cotizacion/user/' + id + '?token=' + this._userService.token;

    return this.http.get(url)
      .map( (res: any) => {
        return res;
      })
      .catch( err => {
        if ( err.status === 401 ) {
          swal('¡Cuidado!', 'Ha expirado su sesión, vuelva a ingresar', 'info');
          this._userService.logout();
          this.router.navigate(['/login']);       
          return Observable.throw(err);
        } else { 
          swal('¡Error!', 'Error al obtener datos', 'error');
          return Observable.throw(err);
        }
      });
      
  }

  setCotizacion( cotizacion: Cotizacion ) {
    let url = URL_SERVER + '/cotizacion?token=' + this._userService.token;

    return this.http.post(url, cotizacion)
      .map( (res: any) => {
        swal('¡Correcto!', 'Cotizacion creada correctamente', 'success');
        return res;
      })
      .catch( err => {
        if ( err.status === 401 ) {
          swal('¡Cuidado!', 'Ha expirado su sesión, vuelva a ingresar', 'info');
          this._userService.logout();
          this.router.navigate(['/login']);       
          return Observable.throw(err);
        } else { 
          swal('¡Error!', 'Error al ingresar datos', 'error');
          return Observable.throw(err);
        }
      });
      
  }

}
