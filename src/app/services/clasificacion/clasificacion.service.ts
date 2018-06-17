import { Injectable } from '@angular/core';
import { URL_SERVER } from '../../config/config';
import { UserService } from '../user/user.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Marca } from '../../models/marca.model';
import { Categoria } from '../../models/categoria.model';
import { Subcategoria } from '../../models/subcategoria.model';

@Injectable()
export class ClasificacionService {

  constructor(
    public _userService: UserService,
    public http: HttpClient,
    public router: Router
  ) { }

  // Marcas
  getMarcas() {
    let url = URL_SERVER + '/marca?token=' + this._userService.token ;

    return this.http.get( url )
      .map( (res: any) => {
        return res.marcas;
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

  setMarca( marca: Marca ) {
    let url = URL_SERVER + '/marca?token=' + this._userService.token;

    return this.http.post( url, marca )
      .map( (res: any) => {
        swal('¡Correcto!', 'Marca agregada correctamente', 'success');
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


  // Categorias
  getCategorias() {
    let url = URL_SERVER + '/categoria?token=' + this._userService.token ;
    
    return this.http.get( url )
      .map( (res: any) => {
        return res.categorias;
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

  getCategoriasById( id: string ) {
    let url = URL_SERVER + '/categoria/' + id + '?token=' + this._userService.token ;
    
    return this.http.get( url )
      .map( (res: any) => {
        return res.categoria;
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

  setCategoria( categoria: Categoria ) {
    let url = URL_SERVER + '/categoria?token=' + this._userService.token;

    return this.http.post( url, categoria )
      .map( (res: any) => {
        swal('¡Correcto!', 'Categoria agregada correctamente', 'success');
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


  // Subcategorias
  getSubcategorias() {
    let url = URL_SERVER + '/subcategoria?token=' + this._userService.token ;

    return this.http.get( url )
      .map( (res: any) => {
        return res.subcategorias;
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

  getSubcategoriaById( id: string ) {
    let url = URL_SERVER + '/subcategoria/' + id + '?token=' + this._userService.token ;

    return this.http.get( url )
      .map( (res: any) => {
        return res.subcategoria;
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

  setSubcategoria( subcategoria: Subcategoria ) {
    let url = URL_SERVER + '/subcategoria?token=' + this._userService.token;

    return this.http.post( url, subcategoria )
      .map( (res: any) => {
        swal('¡Correcto!', 'Subcategoria agregada correctamente', 'success');
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
