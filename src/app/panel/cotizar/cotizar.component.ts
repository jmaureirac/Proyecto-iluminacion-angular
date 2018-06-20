import { Component, OnInit } from '@angular/core';
import { UserService, ProductoService, CotizacionService } from '../../services/service.index';
import { Cotizacion } from '../../models/cotizacion.model';
import { Producto } from '../../models/producto.model';

@Component({
  selector: 'app-cotizar',
  templateUrl: './cotizar.component.html',
  styles: []
})
export class CotizarComponent implements OnInit {

  productos_disponibles: any[] = [];

  cotizacion_producto_temporal: any[] = []; 
  array_productos_confirmados: any[] = []; 

  seleccionado: Producto;
  mostrar_seleccionado: Producto;

  constructor(
    public _userService: UserService,
    public _cotizacionService: CotizacionService,
    public _productoService: ProductoService
  ) { }

  ngOnInit() {
    this.cargarProductos();
  }

  onChange( seleccionado ) {
    if ( seleccionado.length > 1 ) {
      for (const prod of this.productos_disponibles ) {
        if ( prod._id  === seleccionado ) {
          this.mostrar_seleccionado = prod;
          return;
        }
      }
    } else {
      this.mostrar_seleccionado = null;
      return;
    }

  }

  // Agrega a array temporal
  agregarProducto( producto: Producto ) {
    this.cotizacion_producto_temporal.push( { producto: producto, cantidad: 0 } ); // contiene el producto agregado y la cantidad
    this.mostrar_seleccionado = null;
    this.productos_disponibles.splice( this.productos_disponibles.indexOf( producto ), 1 );
  }

  // Quita del array temporal
  cancelarProducto( producto: any ) {
    this.cotizacion_producto_temporal.splice( this.cotizacion_producto_temporal.indexOf( producto ), 1 );
    this.productos_disponibles.push( producto.producto );
  }
  
  // Agrega a array definitivo
  confirmarProducto( producto_confirmado: any ) {
    if ( producto_confirmado.cantidad <= 0 ) {
      swal('¡Cuidado!', 'La cantidad debe ser mayor a 0', 'warning');
      return;
    }
    this.array_productos_confirmados.push( producto_confirmado );
  }

  modificarProducto( producto: any ) {
    this.array_productos_confirmados.splice( this.array_productos_confirmados.indexOf( producto ), 1 );
  }

  // Quita de array definitivo
  quitarProducto( producto: any ) {
    this.array_productos_confirmados.splice( this.array_productos_confirmados.indexOf( producto ), 1 );
    this.cancelarProducto( producto );
  }

  cotizar() {
    let productos = [];
    for (const prod of this.array_productos_confirmados) {
      productos.push( { producto: prod.producto._id, cantidad: prod.cantidad } );
    }

    console.log(productos);

    let cotizacion = new Cotizacion( this._userService.user._id, productos );
    console.log(cotizacion);

    // return;
    this._cotizacionService.setCotizacion( cotizacion )
      .subscribe( () => this.resetCotizacion() );
  }

  resetCotizacion() {
    this.cargarProductos();
    this.cotizacion_producto_temporal = [];
    this.array_productos_confirmados = [];
    this.seleccionado = null;
    this.mostrar_seleccionado = null;
  }

  cargarProductos() {
    this._productoService.getAllProductos()
      .subscribe( res => this.productos_disponibles = res.productos );
  }

}
