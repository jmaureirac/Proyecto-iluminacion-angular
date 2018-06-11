import { Component, OnInit } from '@angular/core';
import { ProductoService, CreateProductoService } from '../../services/service.index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styles: []
})
export class ProductoComponent implements OnInit {

  paginas: number[] = [];
  desde: number = 0;
  total: number;

  productos: any[] = [];

  constructor(
    public _productoService: ProductoService,
    public _modalCreateProducto: CreateProductoService,
    public router: Router
  ) { }

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    this._productoService.getProductosPaginados(this.desde)
      .subscribe( (res: any) => {
        this.productos = res.productos;
        this.total = res.total;
        if ( this.paginas.length === 0 ) {
          this.paginate();
        }
      });
  }
  paginate() {
    let trunc = Math.trunc( this.total / 10 );
    let notrunc = this.total / 10;
    if ( trunc < notrunc ) {
      for (let i = 0; i < trunc + 1 ; i++) {
        this.paginas.push(i);
      }
    } else {
      for (let i = 0; i < trunc ; i++) {
        this.paginas.push(i);
      }
    }
  }

  goPage( page: number ) {
    this._productoService.getProductosPaginados( page * 10 )
      .subscribe( (res: any) => {
        this.productos = res.productos;
        this.total = res.total;
        this.desde = page;
      });
  }

  crearProducto() {
    this._modalCreateProducto.mostrarModal();
  }

}
