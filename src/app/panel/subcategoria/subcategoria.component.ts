import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClasificacionService } from '../../services/service.index';
import { Categoria } from '../../models/categoria.model';

@Component({
  selector: 'app-subcategoria',
  templateUrl: './subcategoria.component.html',
  styles: []
})
export class SubcategoriaComponent implements OnInit {

  subcategorias: any[] = [];
  categorias: Categoria[] = [];

  constructor(
    public _clasificacionService: ClasificacionService
  ) { }

  ngOnInit() {
    this.cargarSubcategorias();
  }
  
  agregar( form: NgForm ) {
    if ( form.invalid ) {
      return;
    }
  
    if ( form.value.categoria.length === 0 ) {
      return;
    } 

    this._clasificacionService.setSubcategoria( form.value )
      .subscribe( () => {
        this.cargarSubcategorias();
        form.reset();
      });
    
  }

  cargarSubcategorias() {
    this._clasificacionService.getSubcategorias().subscribe( subcategorias => this.subcategorias = subcategorias );
    this._clasificacionService.getCategorias().subscribe( categorias => this.categorias = categorias );
  }

}
