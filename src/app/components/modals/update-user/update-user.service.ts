import { Injectable, EventEmitter } from '@angular/core';
import { User } from '../../../models/user.model';

@Injectable()
export class UpdateUserService {

  public oculto: string = 'oculto';

  public notificacion = new EventEmitter<any>();
  public selected = new EventEmitter<User>();

  constructor() { }


  ocultarModal() {
    this.oculto = 'oculto';
  }
  
  mostrarModal( selected: User ) {
    this.oculto = '';
    this.selected.emit(selected);
  }

}
