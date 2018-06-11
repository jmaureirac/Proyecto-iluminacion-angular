import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/service.index';
import { UpdateUserService } from './update-user.service';
import { User } from '../../../models/user.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styles: []
})
export class UpdateUserComponent implements OnInit {

  user: User;

  constructor(
    public _userService: UserService,
    public _modalUpdate: UpdateUserService
  ) {

  }

  ngOnInit() {
    this._modalUpdate.selected
      .subscribe( res => this.user = res );
  }
  

  cerrarModal() {
    this._modalUpdate.ocultarModal();
  }

  actualizarUsuario( form: NgForm ) {
    
    if ( form.invalid ) {
      return;
    }

    this.user.name = form.value.name;

    this._userService.updateUser( this.user )
      .subscribe( res => {
        this._modalUpdate.notificacion.emit(res);
      });

  }


}
