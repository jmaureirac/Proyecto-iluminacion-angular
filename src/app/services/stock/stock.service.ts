import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { URL_SERVER } from '../../config/config';
import { Observable } from 'rxjs/Observable';
import { Stock } from '../../models/stock.model';

@Injectable()
export class StockService {

  constructor(
    public _userService: UserService,
    public http: HttpClient,
    public router: Router
  ) { }

  getStockPaginated() {
    let url = URL_SERVER + '/stock?token=' + this._userService.token;

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

  getAllStock() {
    let url = URL_SERVER + '/stock/all?token=' + this._userService.token;

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

  addStock( stock: Stock ) {
    let url = URL_SERVER + '/stock?token=' + this._userService.token;

    return this.http.post( url, stock )
      .map( (res: any) => {
        swal('¡Correcto!', 'Producto agregado al inventorio correctamente', 'success');
        return true;
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

  updateStock( stock: Stock ) {
    let url = URL_SERVER + '/stock/' + stock._id + '?token=' + this._userService.token;

    return this.http.put( url, stock )
      .map( (res: any) => {
        swal('¡Correcto!', 'Inventario actualizado correctamente', 'success');
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

}
