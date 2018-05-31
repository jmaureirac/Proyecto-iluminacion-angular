import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare function init_plugins();


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login-register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
    init_plugins();    
  }

}
