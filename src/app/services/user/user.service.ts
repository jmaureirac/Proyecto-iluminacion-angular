import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core';
const swal: SweetAlert = _swal as any;

import { URL_SERVER } from '../../config/config';
import { User } from '../../models/user.model';

@Injectable()
export class UserService {

  id: string;
  user: User;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router
  ) {
    this.getStorage();
  }

  registrar( user: User ) {
    let url = URL_SERVER + '/user' ;

    return this.http.post( url, user )
      .map( (res: any) => {
        swal('Correcto', 'Se ha ingresado correctamente', 'success');
        this.router.navigate(['/login']);
      })
      .catch( err => {
        swal('Error', err.error.errors.message, 'info');
        return Observable.throw(err);
      });
      
  }

  login( user: User, remember: boolean = false ) {
    let url = URL_SERVER + '/login';

    if ( remember ) {
      localStorage.setItem('email', user.email);
    } else {
      localStorage.removeItem('email');
    }
    
    return this.http.post(url, user)
      .map( (res: any) => {
        this.setStorage(res.id, res.token, res.user);
        return true;
      })
      .catch( err => {
        swal('¡Error!', 'Credenciales incorrectas', 'error');
        return Observable.throw(err);
      });
      
  }

  loginGoogle( token: string ) {
    let url = URL_SERVER + '/login/google';

    return this.http.post( url, { token })
      .map( (res: any) => {
        this.setStorage(res.id, res.token, res.user);
        return true;
      });
  }

  logout() {
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.token = '';
    this.user = null;
    this.router.navigate(['/inicio']);
  }

  setStorage( id: string, token: string, user: User ) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.token = token;
    this.user = user;
  }

  getStorage() {
    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
      this.user = JSON.parse(localStorage.getItem('user'));
      
    } else {
      this.token = '';
      this.user = null;
    }
  }

  isLogged() {
    return ( this.token.length > 5 ) ? true : false;
  }

  loadUsers() {
    let url = URL_SERVER + '/user/all';

    return this.http.get(url);
      
  }

  loadUsersPaginated( desde: number = 0 ) {
    let url = URL_SERVER + '/user?desde=' + desde;

    return this.http.get(url);
  }

  updateUser( user: User ) {
    let url = URL_SERVER + '/user/' + user._id + '?token=' + this.token;

    return this.http.put(url, user)
      .map( (res: any) => {
        swal('¡Correcto!', 'Datos actualizados correctamente', 'success');
        return res.user;
      })
      .catch( err => {
        if ( err.status === 401 ) {
          swal('¡Cuidado!', 'Ha expirado su sesión, vuelva a ingresar', 'info');   
          this.logout();
          this.router.navigate(['/login']);       
          return Observable.throw(err);
        } else { 
          swal('¡Error!', 'Error al actualizar datos', 'error');
          return Observable.throw(err);
        }
      });      
      
  }

  deleteUser( user: User ) {
    let url = URL_SERVER + '/user/' + user._id + '?token=' + this.token;

    return this.http.delete(url)
      .map( (res: any) => {
        swal('¡Correcto!', 'Usuario eliminado correctamente', 'success');
        
      })
      .catch( err => {
        if ( err.status === 401 ) {
          swal('¡Cuidado!', 'Ha expirado su sesión, vuelva a ingresar', 'info');
          this.logout();
          this.router.navigate(['/login']);       
          return Observable.throw(err);
        } else { 
          swal('¡Error!', 'Error al eliminar usuario', 'error');
          return Observable.throw(err);
        }
      });
      
  }
  
}
