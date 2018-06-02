import { Component, OnInit } from '@angular/core';

import { SidebarService, UserService } from '../../services/service.index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor(
    public _sideBarService: SidebarService,
    public _userService: UserService,
    public router: Router
  ) { }

  ngOnInit() {
  }

}
