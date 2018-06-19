import { NgModule } from '@angular/core';
import { ImagePipe } from './image.pipe';
import { PreciocotizacionPipe } from './preciocotizacion.pipe';
import { TotalproductosPipe } from './totalproductos.pipe';

@NgModule({
  imports: [],
  declarations: [
    ImagePipe,
    PreciocotizacionPipe,
    TotalproductosPipe
  ],
  exports: [
    ImagePipe,
    PreciocotizacionPipe,
    TotalproductosPipe
  ]
})
export class PipesModule { }
