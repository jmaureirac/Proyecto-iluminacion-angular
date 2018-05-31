import { Component, OnInit } from '@angular/core';

import { SidebarService } from '../../services/service.index';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  constructor(
    public _sideBarService: SidebarService,
    public router: Router
  ) { }

  ngOnInit() {
  }

}
