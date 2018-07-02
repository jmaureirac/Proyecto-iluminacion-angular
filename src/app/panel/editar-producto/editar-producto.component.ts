import { Component, OnInit } from '@angular/core';
import { ProductoService, ClasificacionService } from '../../services/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Marca } from '../../models/marca.model';
import { Subcategoria } from '../../models/subcategoria.model';
import { NgForm } from '@angular/forms';

declare function init_dropify();

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styles: []
})
export class EditarProductoComponent implements OnInit {

  producto: any;
  id: string;
  categoria: string; 

  current_sub: string;
  current_marca: string;

  marcas: Marca[] = [];
  subcategorias: Subcategoria[] = [];

  imagen: File;

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
        init_dropify();
      }
    } ) ;
  }

  buscarProducto( id: string ) {
    this._productoService.getProductoByID( id )
      .subscribe( res => {
        this.producto = res.producto;
        this.current_marca = res.producto.marca.nombre;
        this.current_sub = res.producto.subcategoria.nombre;
        this.cargarCategoria( this.producto.subcategoria.categoria );
        if ( !this.producto.medidas ) {
          Object.assign(this.producto, { medidas: { altura: 0, largo: 0, ancho: 0 } });
        }
      });
  }

  async cargarCategoria( id: string ) {
    await this._clasificacionService.getCategoriasById( id )
      .subscribe( res => this.categoria = res.nombre );
  }

  async cargarClasificacion() {
    await this._clasificacionService.getMarcas().subscribe( marcas => this.marcas = marcas );
    await this._clasificacionService.getSubcategorias().subscribe( subcategorias => this.subcategorias = subcategorias );
  }

  guardarCambios() {
    if ( typeof this.producto.subcategoria === 'object' ) {
      this.producto.subcategoria = this.producto.subcategoria._id;
    }
    if ( typeof this.producto.marca === 'object' ) {
      this.producto.marca = this.producto.marca._id;
    }

    this._productoService.updateProducto( this.producto ).subscribe(this.router.navigate['/panel/productos']);
    
  }

  onChange( id_subcategoria: string ) {
    this._clasificacionService.getSubcategoriaById(id_subcategoria)
      .subscribe( res => this.categoria = res.categoria.nombre);

  }

  recargar() {
    location.reload();
  }

  seleccion( archivo: File ) {
    this.imagen = archivo;
  }

  subirImagen() {
    this._productoService.updateImageProduct( this.imagen, this.producto._id )
      .then( res => {
        this.buscarProducto( this.producto._id );
      })
      .catch( err => {
        console.log('Error en la carga de imagen');
      }) ;
  }
}
