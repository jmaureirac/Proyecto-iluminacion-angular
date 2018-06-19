import { Component, OnInit } from '@angular/core';
import { UserService, CotizacionService, ViewCotizacionService } from '../../services/service.index';
import { Cotizacion } from '../../models/cotizacion.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styles: []
})
export class CotizacionComponent implements OnInit {

  cotizaciones: Cotizacion[] = [];

  constructor(
    public _userService: UserService,
    public _cotizacionService: CotizacionService,
    public _modalCotizacion: ViewCotizacionService,
    public router: Router
  ) { }

  ngOnInit() {
    this.cargarCotizaciones();
  }

  cargarCotizaciones() {
    this._cotizacionService.getCotizaciones()
      .subscribe( res => this.cotizaciones = res.cotizaciones ); 
  }

}
