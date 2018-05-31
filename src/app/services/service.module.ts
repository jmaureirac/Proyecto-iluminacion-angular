import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  SidebarService
} from './service.index';


@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    SidebarService
  ],
  declarations: []
})
export class ServiceModule { }
