import { Component, OnInit } from '@angular/core';
import { StockService, ProductoService } from '../../services/service.index';
import { Router } from '@angular/router';
import { Stock } from '../../models/stock.model';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styles: []
})
export class StockComponent implements OnInit {

  stocks: any[] = [];
  productos_tmp: any[] = [];
  total: number = 0;

  constructor(
    public _stockService: StockService,
    public _productoService: ProductoService,
    public router: Router
  ) { }

  ngOnInit() {
    this.cargarTodoStock();
  }

  cargarTodoStock() {
    this._stockService.getAllStock()
      .subscribe( (res: any) => {
        this.stocks = res.stocks;
        this.total = res.total;
        this.cargarProductos();
      });
  }

  cargarProductos() {
    this._productoService.getAllProductos()
      .subscribe( (res: any) => {
        this.productos_tmp = res.productos;
        this.comprobarProductos();
      });
  }

  comprobarProductos() {
    for (let i = 0; i < this.stocks.length; i++) {
      for (let j = 0; j < this.productos_tmp.length; j++) {
        if ( this.stocks[i].producto._id === this.productos_tmp[j]._id ) {
          this.productos_tmp.splice(j, 1);
        }
      }
    }
  }

  actualizarStock( stock: Stock ) {
    if ( stock.cantidad < 0 || stock.precio_compra < 0) {
      swal('¡Cuidado!', 'La cantidad y el precio de comprano pueden ser negativos', 'warning');
      return;
    }

    this._stockService.updateStock(stock)
      .subscribe( () => {
        this.cargarTodoStock();
      });
  }

  agregarStock( producto: any ) {
    let nuevo = new Stock(producto, 0, 0);
    this.stocks.push(nuevo);
  }

  cancelar( stock: Stock ) {
    this.stocks.splice(this.stocks.indexOf(stock), 1);
  }

  ingresar( stock: Stock ) {
    if ( stock.cantidad <= 0 || stock.precio_compra <= 0) {
      swal('¡Cuidado!', 'La cantidad y el precio de compra deben ser superior a 0', 'warning');
      return;
    }

    this._stockService.addStock(stock)
      .subscribe( () => {
        this.cargarTodoStock();
      });
  }

}
