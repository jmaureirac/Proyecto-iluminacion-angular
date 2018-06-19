import { Component, OnInit } from '@angular/core';
import { CotizacionService, UserService, ViewCotizacionService } from '../../services/service.index';
import { Cotizacion } from '../../models/cotizacion.model';

@Component({
  selector: 'app-mis-cotizaciones',
  templateUrl: './mis-cotizaciones.component.html',
  styles: []
})
export class MisCotizacionesComponent implements OnInit {

  misCotizaciones: Cotizacion[] = [];

  constructor(
    public _cotizacionService: CotizacionService,
    public _userService: UserService,
    public _modalCotizacion: ViewCotizacionService
  ) { }

  ngOnInit() {
    this.cargarMisCotizaciones();
  }

  cargarMisCotizaciones() {
    this._cotizacionService.getCotizacionesUser( this._userService.user._id )
      .subscribe( res => this.misCotizaciones = res.cotizaciones );
  }
}
