import { Component, OnInit } from '@angular/core';
import { UserService, ProductoService, CotizacionService } from '../../services/service.index';
import { Cotizacion } from '../../models/cotizacion.model';
import { Producto } from '../../models/producto.model';

declare var jsPDF: any;

@Component({
  selector: 'app-cotizar',
  templateUrl: './cotizar.component.html',
  styles: []
})
export class CotizarComponent implements OnInit {

  productos_disponibles: any[] = [];

  cotizacion_producto_temporal: any[] = []; 
  array_productos_confirmados: any[] = []; 

  seleccionado: Producto;
  mostrar_seleccionado: Producto;

  constructor(
    public _userService: UserService,
    public _cotizacionService: CotizacionService,
    public _productoService: ProductoService
  ) { }

  ngOnInit() {
    this.cargarProductos();
  }

  onChange( seleccionado ) {
    if ( seleccionado.length > 1 ) {
      for (const prod of this.productos_disponibles ) {
        if ( prod._id  === seleccionado ) {
          this.mostrar_seleccionado = prod;
          return;
        }
      }
    } else {
      this.mostrar_seleccionado = null;
      return;
    }

  }

  // Agrega a array temporal
  agregarProducto( producto: Producto ) {
    this.cotizacion_producto_temporal.push( { producto: producto, cantidad: 0 } ); // contiene el producto agregado y la cantidad
    this.mostrar_seleccionado = null;
    this.productos_disponibles.splice( this.productos_disponibles.indexOf( producto ), 1 );
  }

  // Quita del array temporal
  cancelarProducto( producto: any ) {
    this.cotizacion_producto_temporal.splice( this.cotizacion_producto_temporal.indexOf( producto ), 1 );
    this.productos_disponibles.push( producto.producto );
  }
  
  // Agrega a array definitivo
  confirmarProducto( producto_confirmado: any ) {
    if ( producto_confirmado.cantidad <= 0 ) {
      swal('¡Cuidado!', 'La cantidad debe ser mayor a 0', 'warning');
      return;
    }
    this.array_productos_confirmados.push( producto_confirmado );
  }

  modificarProducto( producto: any ) {
    this.array_productos_confirmados.splice( this.array_productos_confirmados.indexOf( producto ), 1 );
  }

  // Quita de array definitivo
  quitarProducto( producto: any ) {
    this.array_productos_confirmados.splice( this.array_productos_confirmados.indexOf( producto ), 1 );
    this.cancelarProducto( producto );
  }

  cotizar() {
    let productos = [];
    for (const prod of this.array_productos_confirmados) {
      productos.push( { producto: prod.producto._id, cantidad: prod.cantidad } );
    }

    let cotizacion = new Cotizacion( this._userService.user._id, productos );

    this._cotizacionService.setCotizacion( cotizacion )
      .subscribe( res => {
        this.resetCotizacion();

        this._cotizacionService.getCotizacionById( res.cotizacion )
          .subscribe( (res2: any) => {
            this.generarPDF( res2.cotizacion );
            this._cotizacionService.sendMail( this._userService.user.name, this._userService.user.email )
              .subscribe();
          } );

      } );
  }

  resetCotizacion() {
    this.cargarProductos();
    this.cotizacion_producto_temporal = [];
    this.array_productos_confirmados = [];
    this.seleccionado = null;
    this.mostrar_seleccionado = null;
  }

  cargarProductos() {
    this._productoService.getAllProductos()
      .subscribe( res => this.productos_disponibles = res.productos );
  }

  generarPDF( cotizacion: Cotizacion ) {

    let doc = new jsPDF();
    
    
    // Nombre - Email - Fecha creación
    let header_user = [
      { title: 'Usuario/Empresa', dataKey: 'user' },
      { title: 'Correo Electrónico', dataKey: 'email' },
      { title: 'Fecha Emisión', dataKey: 'date' }  
    ];
    let fecha = this.parseFecha( cotizacion.created_at ); // fecha parseada para el body de la tabla
    let body_user = [
      { 'user': cotizacion.user.name, 'email': cotizacion.user.email, 'date': fecha }
    ];
    doc.autoTable( header_user, body_user, {
      startY: 30,
      styles: {
        font: 'times',
        fontSize: 11,
        halign: 'center',
        valign: 'middle'
      }
    } );


    // Productos - Total - Precio total de cotizacion
    let header_detalle = [
      { title: 'Productos', dataKey: 'productos' },
      { title: 'Total de productos', dataKey: 'total' },
      { title: 'Precio total', dataKey: 'precio' }
    ];
    let detail = this.parseDetalle(cotizacion.productos); // detalle de la tabla parseado para el body de la tabla
    let body_detalle = [
      { productos: detail.productos, total: detail.total, precio: '$ ' + detail.precio }
    ];

    doc.autoTable( header_detalle , body_detalle , {
      startY: doc.autoTable.previous.finalY + 14,
      styles: {
        font: 'times',
        fontSize: 11,
        halign: 'center',
        valign: 'middle'
      }
    });

    // Tabla de productos
    // # - Nombre producto - Cantidad - Precio unitario - Subtotal
    let header_tabla = [
      { title: '#', dataKey: 'id' },
      { title: 'Nombre Producto', dataKey: 'nombre' },
      { title: 'Cantidad', dataKey: 'cantidad' },
      { title: 'Precio Unitario', dataKey: 'precio' },
      { title: 'Subtotal', dataKey: 'subtotal' },
    ];
    let arrayProductos = this.parseProductos( cotizacion.productos );
    let body_tabla = arrayProductos;

    doc.autoTable( header_tabla , body_tabla, {
      startY: doc.autoTable.previous.finalY + 14,
      halign: 'center',
      valign: 'middle',
      styles: {
        font: 'times',
        fontSize: 11,
        halign: 'center',
        valign: 'middle'
      }
    });


    let fecha_split = fecha.split(' ');
    let fecha_nombre_pdf = fecha_split[1] + '-' + fecha_split[3] + '-' + fecha_split[5]; 

    doc.save(`cotizacionjmc_${cotizacion.user.name}_${fecha_nombre_pdf}.pdf`);

    

  }

  parseFecha( fecha: string ) {
    let dias = [ 'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado' ];
    let meses = [
      'Enero', 'Febrero', 'Marzo', 'Abril',
      'Mayo', 'Junio', 'Julio', 'Agosto',
      'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' 
    ];

    let date = new Date(fecha);

    // tslint:disable-next-line:max-line-length
    return `${dias[date.getDay()]} ${date.getDate()} de ${meses[date.getMonth()]} de ${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()} `;

  }

  parseDetalle( productos: any[] ) {
    let detalle = {
      productos: 0,
      total: 0,
      precio: 0
    };

    for (const prod of productos) {
      detalle.productos++;
      detalle.total += prod.cantidad;
      detalle.precio += prod.cantidad * prod.producto.precio_unitario;
    }

    return detalle;
  }

  parseProductos( productos: any[] ) {
    let arrayProductos = [];

    // tslint:disable-next-line:no-unused-expression
    for (let i = 0; i < productos.length ; i++) {
      arrayProductos.push({
        id: i + 1,
        nombre: productos[i].producto.nombre,
        cantidad: productos[i].cantidad,
        precio: '$ ' + productos[i].producto.precio_unitario,
        subtotal: '$ ' + productos[i].cantidad * productos[i].producto.precio_unitario
      });
    }

    return arrayProductos;
  }

}
