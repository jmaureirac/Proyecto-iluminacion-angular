import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { URL_SERVER } from '../../config/config';
import { UserService } from '../user/user.service';
import { HttpClient } from '@angular/common/http';



@Injectable()
export class ProductoService {

  constructor(
    public _userService: UserService,
    public http: HttpClient,
    public router: Router
  ) { }

  getProductosPaginados( desde: number = 0 ) {
    let url = URL_SERVER + '/producto?token=' + this._userService.token + '&desde=' + desde;

    return this.http.get(url);
  }

}
