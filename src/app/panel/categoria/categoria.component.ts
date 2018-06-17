import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClasificacionService } from '../../services/service.index';
import { Categoria } from '../../models/categoria.model';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styles: []
})
export class CategoriaComponent implements OnInit {

  categorias: Categoria[] = [];  

  constructor(
    public _clasificacionService: ClasificacionService
  ) { }

  ngOnInit() {
    this.cargarCategorias();
  }

  agregar( form: NgForm ) {
    if ( form.invalid ) {
      return;
    }
    
    this._clasificacionService.setCategoria(form.value)
      .subscribe( () => {
        this.cargarCategorias();
        form.reset();
      });
  }

  cargarCategorias() {
    this._clasificacionService.getCategorias()
      .subscribe( categorias => {
        this.categorias = categorias;
      });
  }

}
