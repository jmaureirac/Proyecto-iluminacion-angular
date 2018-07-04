import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/service.index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos-client',
  templateUrl: './productos-client.component.html',
  styles: []
})
export class ProductosClientComponent implements OnInit {

  total: number;
  productos: any[] = [];
  subcategorias: string[] = [];

  productosPorSubcategoria: any[] = [];

  subcategoriaActiva: string;

  constructor(
    public _productoService: ProductoService,
    public router: Router
  ) { }

  ngOnInit() {
    this.cargarProductos();
    
  }

  async cargarProductos() {
    await this._productoService.getAllProductos()
      .subscribe( res => {
        this.total = res.total;
        this.productos = res.productos;
        this.obtenerSubcategorias( this.productos );
      });
  }

  obtenerSubcategorias( productos: any[] ) {
    productos.forEach(producto => {
      if ( !this.subcategorias.includes( producto.subcategoria.nombre ) ) {
        this.subcategorias.push( producto.subcategoria.nombre ); 
      }
    });
    this.separarProductosSubcategoria( this.subcategorias );
  }

  separarProductosSubcategoria( subcategorias: string[] ) {
    subcategorias.forEach( nombre => {
      this.productosPorSubcategoria.push({
        subcategoria: nombre,
        productos: this.filtrarProductos( nombre )
      });
    });
    this.subcategoriaActiva = this.productosPorSubcategoria[0].subcategoria;
  }

  filtrarProductos( subcategoria: string ) {
    let arrayProductos = [];
    this.productos.forEach( prod => {
      if ( prod.subcategoria.nombre === subcategoria ) {
        arrayProductos.push( prod );
      }
    });
    return arrayProductos;
  }

}
