import { Component, OnInit } from '@angular/core';

declare function init_plugins();

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styles: []
})
export class ClientComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_plugins();    
  }

}
