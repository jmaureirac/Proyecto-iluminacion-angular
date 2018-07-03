import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClasificacionService } from '../../services/clasificacion/clasificacion.service';
import { Categoria } from '../../models/categoria.model';

@Component({
  selector: 'app-header-client',
  templateUrl: './header-client.component.html',
  styles: []
})
export class HeaderClientComponent implements OnInit {

  year: number = new Date().getFullYear();

  categorias: Categoria[] = [];

  constructor(
    public router: Router,
    public _clasificacionService: ClasificacionService
  ) { }

  ngOnInit() {
    this.cargarCategorias();
  }

  cargarCategorias() {
    this._clasificacionService.getCategorias()
      .subscribe( res => this.categorias = res);
  }

}
