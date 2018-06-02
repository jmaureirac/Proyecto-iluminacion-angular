import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

declare function init_plugins();

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styles: []
})
export class ClientComponent implements OnInit {

  constructor(
    public title: Title
  ) {
    this.title.setTitle('JMC Iluminación');
  }

  ngOnInit() {
    init_plugins();    
  }

}
