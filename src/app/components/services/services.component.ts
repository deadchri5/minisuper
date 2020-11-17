import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  public bannerTittle: string = 'Servicios';
  public bannerText: string = 'Lo que ofrecemos';

  constructor() { }

  ngOnInit() {
    window.scroll(0, 0);
    document.getElementById('banner__main').classList.toggle('banner__services');
  }

}
