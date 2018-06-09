import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/service.index';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { NgForm } from '@angular/forms';

declare var swal: any;


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: []
})
export class UserComponent implements OnInit {

  users: User[] = [];
  total: number;

  // modal actualizar usuario
  selected: User = null;

  // paginacion
  paginas: number[] = [];
  desde: number = 0;

  constructor(
    public _userService: UserService,
    public router: Router
  ) {
    
  }

  ngOnInit() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this._userService.loadUsersPaginated(this.desde)
      .subscribe( (res: any) => {
        this.users = res.usuarios;
        this.total = res.total;
        if ( this.paginas.length === 0 ) {
          this.paginate();
        }
      });
  }


  paginate() {
    let trunc = Math.trunc( this.total / 10 );
    let notrunc = this.total / 10;
    if ( trunc < notrunc ) {
      for (let i = 0; i < trunc + 1 ; i++) {
        this.paginas.push(i);
      }
    } else {
      for (let i = 0; i < trunc ; i++) {
        this.paginas.push(i);
      }
    }
  }

  goPage( page: number ) {
    this._userService.loadUsersPaginated( page * 10 )
      .subscribe( (res: any) => {
        this.users = res.usuarios;
        this.total = res.total;
        this.desde = page;
      });
  }

  actualizarUser() {
    this._userService.updateUser( this.selected )
      .subscribe();
  }
  
  confirmarEliminar( user: User ) {
    swal({
      title: `¿Estás seguro? `,
      text: `Estás a punto de eliminar a ${user.name}`,
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        this._userService.deleteUser(user)
          .subscribe( deleted => {
            swal('Usuario eliminado correctamente', {
              icon: 'success',
            });
            this.cargarUsuarios();
          });        
      } else {
        swal('Has cancelado la operación');
      }
    });
  }


}
