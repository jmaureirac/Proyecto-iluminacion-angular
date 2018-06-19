import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  SidebarService,
  UserService,
  ProductoService,
  StockService,
  ClasificacionService,
  CotizacionService,
  LoginGuard,
  UpdateUserService,
  CreateProductoService,
  ViewCotizacionService
} from './service.index';


@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    SidebarService,
    UserService,
    ProductoService,
    StockService,
    ClasificacionService,
    CotizacionService,
    LoginGuard,
    UpdateUserService,
    CreateProductoService,
    ViewCotizacionService
  ],
  declarations: []
})
export class ServiceModule { }
