import { Component, OnInit } from '@angular/core';
import { $ } from 'protractor';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public bannerTittle: string = 'Inicio';
  public bannerText: string = 'Bienvenido nuestra web.';
  public commentString: string = 'Gracias por escribirnos, tus comentarios nos ayudan a mejorar nuestros servicios.';

  constructor() { }

  ngOnInit() {
    window.scroll(0, 0);
  }


}
