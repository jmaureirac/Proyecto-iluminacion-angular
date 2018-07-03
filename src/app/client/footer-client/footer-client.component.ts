import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-client',
  templateUrl: './footer-client.component.html',
  styles: []
})
export class FooterClientComponent implements OnInit {

  year: number = new Date().getFullYear();

  constructor() { }

  ngOnInit() {
  }

}
