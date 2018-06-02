import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { UserService } from '../services/service.index';
import { User } from '../models/user.model';
import { Title } from '@angular/platform-browser';

declare const gapi: any;

declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login-register.component.css']
})
export class LoginComponent implements OnInit {

  remember: boolean = false;
  status: boolean = true;
  email: string;
  
  constructor(
    public router: Router,
    public _userService: UserService,
    public title: Title
  ) {
    this.title.setTitle('Iniciar Sesión');
  }

  ngOnInit() {
    init_plugins();
    this.email = localStorage.getItem('email') || '';
    this.remember = (this.email.length > 0) ? true : false; 
    this.attachSignin();
  }

  googleInit() {
    return new Promise((resolve, reject) => {
      gapi.load('auth2', () => {
        let auth2 = gapi.auth2.init({
          client_id: '743422880281-s8e0i8vq709fjlpu8dsv1psav29cn272.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
          scope: 'profile email'
        });
        resolve(auth2);
      });  
    });
  }

  attachSignin() {
    this.googleInit().then( (auth2: any) => {
      let element = document.getElementById('btnGoogle');
      auth2.attachClickHandler( element, {}, (googleUser) => {
        let token = googleUser.getAuthResponse().id_token;
        this._userService.loginGoogle(token)
          .subscribe( () => window.location.href = '#/panel/dashboard');
      });
    });
  }

  ingresar( form: NgForm, remember ) {
    
    if ( form.invalid ) {
      return;
    }

    let user = new User(null, form.value.email, form.value.password);

    this._userService.login( user, form.value.remember )
      .subscribe( res => {
        this.router.navigate(['/panel', 'dashboard']);
      }, err => {
       
      });
    
  }


  

}
