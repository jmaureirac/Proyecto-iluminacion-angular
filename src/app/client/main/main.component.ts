import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styles: []
})
export class MainComponent implements OnInit {

  constructor(
    public router: Router,
    public location: Location
  ) { }

  ngOnInit() {
  }

  back() {
    this.location.back();
  }

}
