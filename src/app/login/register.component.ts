import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare function init_plugins();

import { User } from '../models/user.model';
import { UserService } from '../services/service.index';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  user: User;

  constructor(
    public router: Router,
    public _userService: UserService,
    public title: Title
  ) {
    this.title.setTitle('Registrarse');
  }

  ngOnInit() {
    init_plugins();
    
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      password2: new FormControl(null, [Validators.required, Validators.minLength(6)])
    }, { validators: this.iguales('password', 'password2') });
  }
  
  iguales( campo1: string, campo2: string ) {
    return (group: FormGroup) => {

      let pw1 = group.controls[campo1].value;
      let pw2 = group.controls[campo2].value;
      
      if ( pw1 === pw2 ) {
        return null;
      }

      return {
        iguales: true
      };

    };

  }

  registrar() {

    if ( this.form.invalid ) {
      return;
    }
    
    let user = new User(
      this.form.value.name,
      this.form.value.email,
      this.form.value.password      
    );
   
    this._userService.registrar( user )
      .subscribe(res => {}, err => {});
  }

}
