import { Component } from '@angular/core';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html'
})

export class Error404Component {

  errMsj: string
  img: string

  constructor() {
    this.errMsj = 'La página solicitada no existe en el servidor.'
    this.img = '../../../assets/images/icons/082-shopping-bag-5.svg'
  }

}
