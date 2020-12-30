import { Component } from '@angular/core';

@Component({
  selector: 'app-shoppingcard',
  templateUrl: './shoppingcard.component.html',
  styleUrls: ['./shoppingcard.component.scss']
})
export class ShoppingcardComponent {

  counterOfItems: number;
  subTotal: number;
  priceTemporal: number;

  constructor() { 
    this.counterOfItems = 1;
  }

  ngOnInit() {
  }

  increaseItm() {
    this.counterOfItems++;
  }

  decreaseItm() {
    if (this.counterOfItems == 1) {
      return;
    }
    this.counterOfItems--;
  }

}
