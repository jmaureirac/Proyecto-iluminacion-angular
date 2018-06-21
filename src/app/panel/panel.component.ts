import { Component, OnInit } from '@angular/core';

declare function init_plugins();
declare function init_jasny();

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styles: []
})
export class PanelComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_plugins();    
    init_jasny();
  }

}
