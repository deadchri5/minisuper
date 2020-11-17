import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit {

  public bannerTittle: string = 'Nosotros';
  public bannerText: string = 'Quienes somos.';

  constructor() {
   }

  ngOnInit() {
    window.scroll(0, 0);
    document.getElementById('banner__main').classList.toggle('banner__about');
  }

}
