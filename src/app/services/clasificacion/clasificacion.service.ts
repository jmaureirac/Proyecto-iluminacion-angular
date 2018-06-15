import { Injectable } from '@angular/core';
import { URL_SERVER } from '../../config/config';
import { UserService } from '../user/user.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ClasificacionService {

  constructor(
    public _userService: UserService,
    public http: HttpClient
  ) { }

  // Marcas
  getMarcas() {
    let url = URL_SERVER + '/marca?token=' + this._userService.token ;

    return this.http.get( url )
      .map( (res: any) => {
        return res.marcas;
      });
      
  }


  // Categorias
  getCategorias() {
    let url = URL_SERVER + '/categoria?token=' + this._userService.token ;
    
    return this.http.get( url )
      .map( (res: any) => {
        return res.categorias;
      });
  }

  getCategoriasById( id: string ) {
    let url = URL_SERVER + '/categoria/' + id + '?token=' + this._userService.token ;
    
    return this.http.get( url )
      .map( (res: any) => {
        return res.categoria;
      });
  }

  // Subcategorias
  getSubcategorias() {
    let url = URL_SERVER + '/subcategoria?token=' + this._userService.token ;

    return this.http.get( url )
      .map( (res: any) => {
        return res.subcategorias;
      });
  }

  getSubcategoriaById( id: string ) {
    let url = URL_SERVER + '/subcategoria/' + id + '?token=' + this._userService.token ;

    return this.http.get( url )
      .map( (res: any) => {
        return res.subcategoria;
      });
  }



}
