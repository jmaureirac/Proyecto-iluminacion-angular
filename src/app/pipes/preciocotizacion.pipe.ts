import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'preciocotizacion'
})
export class PreciocotizacionPipe implements PipeTransform {

  transform( productos: any[]): any {

    let precio: number = 0;

    for (const prod of productos) {
      precio += prod.cantidad * prod.producto.precio_unitario;
    }

    return precio;
  }

}
