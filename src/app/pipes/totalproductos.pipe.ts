import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'totalproductos'
})
export class TotalproductosPipe implements PipeTransform {

  transform( productos: any ): any {
    let cantidad: number = 0;

    for (const prod of productos) {
      cantidad += prod.cantidad;
    }

    return cantidad;
  }

}
