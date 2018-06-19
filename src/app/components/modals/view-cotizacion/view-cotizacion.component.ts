import { Component, OnInit } from '@angular/core';
import { ViewCotizacionService } from './view-cotizacion.service';
import { Cotizacion } from '../../../models/cotizacion.model';

@Component({
  selector: 'app-view-cotizacion',
  templateUrl: './view-cotizacion.component.html',
  styles: []
})
export class ViewCotizacionComponent implements OnInit {

  cotizacion: Cotizacion;

  constructor(
    public _modalCotizacion: ViewCotizacionService
  ) { }

  ngOnInit() {
    this._modalCotizacion.open
      .subscribe( (cotizacion) => this.cotizacion = cotizacion );
  }


  cerrarModal() {
    this._modalCotizacion.ocultarModal();
  }

}
