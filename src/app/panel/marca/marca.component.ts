import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClasificacionService } from '../../services/service.index';
import { Marca } from '../../models/marca.model';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styles: []
})
export class MarcaComponent implements OnInit {

  marcas: Marca[] = [];

  constructor(
    public _clasificacionService: ClasificacionService
  ) { }

  ngOnInit() {
    this.cargarMarcas();
  }

  agregar( form: NgForm ) {
    if ( form.invalid ) {
      return;
    }

    this._clasificacionService.setMarca(form.value)
      .subscribe( () => {
        this.cargarMarcas();
        form.reset();
      });
  }

  cargarMarcas() {
    this._clasificacionService.getMarcas()
      .subscribe( marcas => this.marcas = marcas ); 
  }


}
