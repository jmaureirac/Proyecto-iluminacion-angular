import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class CreateProductoService {

  public oculto: string = 'oculto';

  public notificacion = new EventEmitter<any>();

  constructor() { }


  ocultarModal() {
    this.oculto = 'oculto';
  }
  
  mostrarModal() {
    this.oculto = '';
  }

}
