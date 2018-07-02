import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { URL_SERVER } from '../../config/config';
import { UserService } from '../user/user.service';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../../models/producto.model';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';


@Injectable()
export class ProductoService {

  constructor(
    public _userService: UserService,
    public http: HttpClient,
    public router: Router,
    public location: Location
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

  updateProducto( producto: Producto ) {
    let url = URL_SERVER + '/producto/' + producto._id + '?token=' + this._userService.token;

    return this.http.put( url, producto )
      .map( (res: any) => {
        swal('¡Correcto!', 'Producto actualizado correctamente', 'success');
        return true;
      })
      .catch( err => {
        if ( err.status === 401 ) {
          swal('¡Cuidado!', 'Ha expirado su sesión, vuelva a ingresar', 'info');
          this._userService.logout();
          this.router.navigate(['/login']);       
          return Observable.throw(err);
        } else { 
          swal('¡Error!', 'Error al actualizar datos', 'error');
          return Observable.throw(err);
        }
      });
      
  }

  getProductoByID( id: string ) {
    let url = URL_SERVER + '/producto/' + id + '?token=' + this._userService.token;

    return this.http.get( url )
      .map( (res: any) => {
        return res;
      })
      .catch( err => {
        if ( err.status === 401 ) {
          swal('¡Cuidado!', 'Ha expirado su sesión, vuelva a ingresar', 'info');
          this.router.navigate(['/login']);       
          return Observable.throw(err);
        } else { 
          this.location.back();
          return Observable.throw(err);
        }
      });
      
  }

  updateImageProduct( archivo: File, id: string ) {

    return new Promise( (resolve, reject) => {

      let formData = new FormData();
      let xhr = new XMLHttpRequest();
      
      formData.append( 'imagen', archivo, archivo.name );

      xhr.onreadystatechange = function() {

        if ( xhr.readyState === 4 ) {
          
          if ( xhr.status === 200 ) {
            swal('¡Correcto!', 'Imagen actualizada correctamente', 'success');
            resolve( JSON.parse(xhr.response) );
          } else {
            swal('¡Error!', 'El archivo seleccionado no es de tipo imagen o no tiene permisos para realizar esta acción', 'error');
            reject( JSON.parse(xhr.response) );
          }
        
        }
      
      };

      let url = URL_SERVER + '/upload/' + id + '?token=' + this._userService.token;

      xhr.open('PUT', url, true);
      xhr.send( formData );
    
    });
  
  }

}
