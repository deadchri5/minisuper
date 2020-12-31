import { Component } from '@angular/core';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.scss']
})
export class ShoppingcartComponent {

  numberOfItems: number;
  totalPrice: number;

   /**
   * objeto estatico de prueba para test de carrito
   */
  items = [
    {
      name: 'Cocacola 500ml',
      price: 15.50
    },
    {
      name: 'sabritas flaming hot',
      price: 12
    },
    {
      name: 'gansito marinela',
      price: 10
    }
  ];

  constructor() { }

  increasePrice(itmsInfo) {
    let tempPrice: number = itmsInfo.price;
    let tempNumberOfItems: number = itmsInfo.items;
    if (this.totalPrice == undefined) {
      this.totalPrice = tempPrice;
      this.numberOfItems = tempNumberOfItems;
    }
    else {
      this.totalPrice += tempPrice;
      this.numberOfItems++;
    }
  }

  decreasePrice(priceInfo) {
    let tempValueToDecrease: number = priceInfo.price;
    this.totalPrice -= tempValueToDecrease;
    this.numberOfItems--;
  }

}