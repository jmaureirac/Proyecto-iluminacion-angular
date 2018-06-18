import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { URL_SERVER } from '../../config/config';
import { UserService } from '../user/user.service';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../../models/producto.model';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ProductoService {

  constructor(
    public _userService: UserService,
    public http: HttpClient,
    public router: Router
  ) { }

  getProductosPaginados( desde: number = 0 ) {
    let url = URL_SERVER + '/producto?token=' + this._userService.token + '&desde=' + desde;

    return this.http.get(url)
      .catch( err => {
        if ( err.status === 401 ) {
          swal('¡Cuidado!', 'Ha expirado su sesión, vuelva a ingresar', 'info');
          this._userService.logout();       
          this.router.navigate(['/login']);
          return Observable.throw(err);
        } else { 
          swal('¡Error!', 'Error al obtener productos', 'error');
          return Observable.throw(err);
        }
      });
  }

  getAllProductos() {
    let url = URL_SERVER + '/producto/all?token=' + this._userService.token;

    return this.http.get(url)
      .catch( err => {
        if ( err.status === 401 ) {
          swal('¡Cuidado!', 'Ha expirado su sesión, vuelva a ingresar', 'info');
          this._userService.logout();       
          this.router.navigate(['/login']);
          return Observable.throw(err);
        } else { 
          swal('¡Error!', 'Error al obtener productos', 'error');
          return Observable.throw(err);
        }
      });
  }

  createProducto( producto: Producto ) {
    let url = URL_SERVER + '/producto?token=' + this._userService.token;

    return this.http.post( url, producto )
      .map( (res: any) => {
        swal('¡Correcto!', 'Producto ingresado correctamente', 'success');
        return res.producto;
      })
      .catch( err => {
        if ( err.status === 401 ) {
          swal('¡Cuidado!', 'Ha expirado su sesión, vuelva a ingresar', 'info');
          this._userService.logout();       
          this.router.navigate(['/login']);
          return Observable.throw(err);
        } else { 
          swal('¡Error!', 'Error al ingresar producto', 'error');
          return Observable.throw(err);
        }
      });
      
  }

  deleteProducto( producto: Producto ) {
    let url = URL_SERVER + '/producto/' + producto._id + '?token=' + this._userService.token;

    return this.http.delete(url)
      .map( () => {
        swal('¡Correcto!', 'Producto eliminado correctamente', 'success');
        return true;
      })
      .catch( err => {
        if ( err.status === 401 ) {
          swal('¡Cuidado!', 'Ha expirado su sesión, vuelva a ingresar', 'info');
          this._userService.logout();
          this.router.navigate(['/login']);       
          return Observable.throw(err);
        } else { 
          swal('¡Error!', 'Error al eliminar producto', 'error');
          return Observable.throw(err);
        }
      });
      
  }

}
