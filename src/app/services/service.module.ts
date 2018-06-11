import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  SidebarService,
  UserService,
  ProductoService,
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
    ProductoService,
    LoginGuard,
    UpdateUserService,
    CreateProductoService
  ],
  declarations: []
})
export class ServiceModule { }
