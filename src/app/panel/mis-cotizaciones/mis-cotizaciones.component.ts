import { Component, OnInit } from '@angular/core';
import { CotizacionService, UserService, ViewCotizacionService } from '../../services/service.index';
import { Cotizacion } from '../../models/cotizacion.model';

declare var jsPDF: any;

@Component({
  selector: 'app-mis-cotizaciones',
  templateUrl: './mis-cotizaciones.component.html',
  styles: []
})
export class MisCotizacionesComponent implements OnInit {

  misCotizaciones: Cotizacion[] = [];

  constructor(
    public _cotizacionService: CotizacionService,
    public _userService: UserService,
    public _modalCotizacion: ViewCotizacionService
  ) { }

  ngOnInit() {
    this.cargarMisCotizaciones();
  }

  cargarMisCotizaciones() {
    this._cotizacionService.getCotizacionesUser( this._userService.user._id )
      .subscribe( res => this.misCotizaciones = res.cotizaciones );
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
