import { Component, OnInit } from '@angular/core';
import { UserService, ProductoService } from '../../services/service.index';

@Component({
  selector: 'app-cotizar',
  templateUrl: './cotizar.component.html',
  styles: []
})
export class CotizarComponent implements OnInit {

  productos: any[] = [];

  constructor(
    public _userService: UserService,
    public _productoService: ProductoService
  ) { }

  ngOnInit() {
  }

  cargarProductos() {
    this._productoService.getAllProductos()
      .subscribe( res => this.productos = res.productos );
  }

}
