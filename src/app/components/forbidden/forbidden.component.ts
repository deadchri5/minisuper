import { Component } from '@angular/core';

@Component({
  selector: 'app-forbidden',
  templateUrl: '../error404/error404.component.html'
})

export class ForbiddenComponent {

  errMsj: string
  img: string

  constructor() { 
    this.errMsj = 'No tienes perimiso para ver está página o recurso.'
    this.img = '../../../assets/images/logoMobile.png'
  }

}
