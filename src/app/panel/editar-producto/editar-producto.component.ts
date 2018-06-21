import { Component, OnInit } from '@angular/core';
import { ProductoService, ClasificacionService } from '../../services/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import { Producto } from '../../models/producto.model';
import { Location } from '@angular/common';
import { Marca } from '../../models/marca.model';
import { Subcategoria } from '../../models/subcategoria.model';


@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styles: []
})
export class EditarProductoComponent implements OnInit {

  producto: Producto;
  id: string;

  marcas: Marca[] = [];
  subcategorias: Subcategoria[] = [];

  constructor(
    public _productoService: ProductoService,
    public _clasificacionService: ClasificacionService,
    public activatedRoute: ActivatedRoute,
    public location: Location,
    public router: Router
  ) { }

  ngOnInit() {
    this.getId();
    this.cargarClasificacion();
  }

  getId() {
    this.activatedRoute.params.subscribe( params => {
      if ( params['id'] === null ) {
        this.location.back();
      } else if ( params['id'].length < 23 ) {
        this.location.back();
      } else {
        this.buscarProducto( params['id'] );
      }
    } ) ;
  }

  buscarProducto( id: string ) {
    this._productoService.getProductoByID( id )
      .subscribe( res => this.producto = res.producto );
  }

  async cargarClasificacion() {
    await this._clasificacionService.getMarcas().subscribe( marcas => this.marcas = marcas );
    await this._clasificacionService.getSubcategorias().subscribe( subcategorias => this.subcategorias = subcategorias );
  }

}
