import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  SidebarService,
  UserService,
  ProductoService,
  ClasificacionService,
  LoginGuard,
  UpdateUserService,
  CreateProductoService
} from './service.index';


@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    SidebarService,
    UserService,
    ClasificacionService,
    ProductoService,
    LoginGuard,
    UpdateUserService,
    CreateProductoService
  ],
  declarations: []
})
export class ServiceModule { }
