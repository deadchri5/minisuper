import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-breakfasts',
  templateUrl: './breakfasts.component.html',
  styleUrls: ['./breakfasts.component.scss']
})
export class BreakfastsComponent implements OnInit {

  public bannerTittle: string = 'Desayunos';
  public bannerText: string = 'Disfruta de algo delicioso.';

  constructor() { }

  ngOnInit() {
    window.scroll(0, 0);
    document.getElementById('banner__main').classList.toggle('banner__breakfasts');
  }

}
