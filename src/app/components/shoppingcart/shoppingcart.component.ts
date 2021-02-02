import { Component, OnInit} from '@angular/core';
import { CarProduct } from 'src/app/models/CarProduct';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.scss']
})
export class ShoppingcartComponent implements OnInit {

  numberOfItems: number;
  totalPrice: number;

  productsOfSessionStorage: CarProduct[];

  constructor() { 
    this.productsOfSessionStorage = [];
  }

  ngOnInit() {
    window.scroll(0, 0);
    this.productsOfSessionStorage = JSON.parse(sessionStorage.getItem('products'));
  }

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

  reloadThisComponent(removeInfo) {
    let { cost, numberOfItems } = removeInfo
    this.totalPrice -= cost
    this.numberOfItems -= numberOfItems
    this.ngOnInit()
  }

}