import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  SidebarService,
  UserService,
  LoginGuard
} from './service.index';


@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    SidebarService,
    UserService,
    LoginGuard
  ],
  declarations: []
})
export class ServiceModule { }
