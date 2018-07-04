import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/service.index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos-client',
  templateUrl: './productos-client.component.html',
  styles: []
})
export class ProductosClientComponent implements OnInit {

  prueba: number[] = [1, 2, 3];

  total: number;
  productos: any[] = [];
  subcategorias: string[] = [];

  productosPorSubcategoria: any[] = [];

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
        // se le quita espacio al nombre, porque se bindea como id de elemento html y no lee elementos con ' ' en el id
        this.subcategorias.push( producto.subcategoria.nombre.split(' ').join('_') ); 
      }
    });
    this.separarProductosSubcategoria( productos, this.subcategorias );
  }

  separarProductosSubcategoria( productos: any[], subcategorias: string[] ) {
    subcategorias.forEach( nombre => {
      this.productosPorSubcategoria.push({
        id: nombre,
        subcategoria: nombre.split('_').join(' '),
        productos: this.filtrarProductos( nombre )
      });
    });
    console.log(this.productosPorSubcategoria);

  }

  filtrarProductos( subcategoria: string ) {
    let arrayProductos = [];
    this.productos.forEach( prod => {
      if ( prod.subcategoria.nombre === subcategoria.split('_').join(' ') ) {
        arrayProductos.push( prod );
      }
    });
    return arrayProductos;
  }

}
