import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bannercovid',
  templateUrl: './bannercovid.component.html',
  styleUrls: ['./bannercovid.component.scss']
})
export class BannercovidComponent implements OnInit {

  constructor() { }

  hola() {
    document.getElementById('covid__msj').remove();
  }

  ngOnInit() {
  }

}
