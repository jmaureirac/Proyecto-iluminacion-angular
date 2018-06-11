import { Component, OnInit } from '@angular/core';
import { CreateProductoService } from './create-producto.service';

@Component({
  selector: 'app-create-producto',
  templateUrl: './create-producto.component.html',
  styles: []
})
export class CreateProductoComponent implements OnInit {

  constructor(
    public _modalCreateProducto: CreateProductoService
  ) { }

  ngOnInit() {
  }

  crearProducto() {

  }
  
  cerrarModal() {
    this._modalCreateProducto.ocultarModal();
  }

}
