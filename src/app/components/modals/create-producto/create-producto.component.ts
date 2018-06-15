import { Component, OnInit } from '@angular/core';
import { ProductoService, ClasificacionService, CreateProductoService  } from '../../../services/service.index';
import { Producto } from '../../../models/producto.model';
import { Marca } from '../../../models/marca.model';
import { Subcategoria } from '../../../models/subcategoria.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-producto',
  templateUrl: './create-producto.component.html',
  styles: []
})
export class CreateProductoComponent implements OnInit {

  nuevoProducto: Producto;
  marcas: Marca[] = [];
  subcategorias: Subcategoria[] = [];

  selectedSubcategoria: Subcategoria;
  categoria: string = '';

  constructor(
    public _modalCreateProducto: CreateProductoService,
    public _productoService: ProductoService,
    public _clasificacionService: ClasificacionService,
    public router: Router
  ) {
    
  }

  ngOnInit() {
    this._modalCreateProducto.inicializa
      .subscribe( () => this.cargarClasificaciones() );
    
  }

  onChange( subcategoria: string ) {
    if ( subcategoria.length > 0 ) {
      this._clasificacionService.getSubcategoriaById(subcategoria)
      .subscribe( (res: any) => {
        this.categoria = res.categoria.nombre;
      });
    } else {
      this.categoria = '';
    }
  }

  crearProducto( form: NgForm ) {

    if ( form.invalid ) {
      return;
    }

    if ( !form.value.altura || !form.value.ancho || !form.value.largo ) {
      form.value.largo = null;
      form.value.altura = null;
      form.value.ancho = null;
    }

    this._productoService.createProducto( form.value )
      .subscribe( res => {
        this._modalCreateProducto.notificacion.emit(res);
        this.cerrarModal();
      });    
  }

  cargarClasificaciones() {
    this._clasificacionService.getMarcas().subscribe( marcas => this.marcas = marcas );
    this._clasificacionService.getSubcategorias().subscribe( subcategorias => this.subcategorias = subcategorias );
  }
  
  cerrarModal() {
    this.nuevoProducto = null;
    this.marcas = null;
    this.subcategorias = null;
    this._modalCreateProducto.ocultarModal();
  }

  nuevaClasificacion( tipo: string ) {
    this.cerrarModal();
    this.router.navigate(['/panel/clasificacion', tipo]);
  }

}
