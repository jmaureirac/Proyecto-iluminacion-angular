import { Injectable, EventEmitter } from '@angular/core';
import { Cotizacion } from '../../../models/cotizacion.model';

@Injectable()
export class ViewCotizacionService {

  public oculto: string = 'oculto';

  public open = new EventEmitter<Cotizacion>();

  constructor() { }

  ocultarModal() {
    this.oculto = 'oculto';
  }
  
  mostrarModal( cotizacion: Cotizacion ) {
    this.oculto = '';
    this.open.emit(cotizacion);
  }

}
