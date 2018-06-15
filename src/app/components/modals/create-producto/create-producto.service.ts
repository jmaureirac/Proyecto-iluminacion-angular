import { Injectable, EventEmitter } from '@angular/core';
import { Producto } from '../../../models/producto.model';

@Injectable()
export class CreateProductoService {

  public oculto: string = 'oculto';
  
  public detalle: string = 'oculto';
  public productoDetalle: any = null;

  public notificacion = new EventEmitter<any>();
  public inicializa = new EventEmitter<any>();

  constructor() { }


  ocultarModal() {
    this.oculto = 'oculto';
  }
  
  mostrarModal() {
    this.oculto = '';
    this.inicializa.emit();
  }

  ocultarDetalle() {
    this.detalle = 'oculto';
    this.productoDetalle = null;
  }

  mostrardetalle( producto: Producto ) {
    this.detalle = '';
    this.productoDetalle = producto;
  }
  

}
