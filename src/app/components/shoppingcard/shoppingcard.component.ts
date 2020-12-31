import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Ejemplo } from  'src/app/models/ejemplo';

@Component({
  selector: 'app-shoppingcard',
  templateUrl: './shoppingcard.component.html',
  styleUrls: ['./shoppingcard.component.scss']
})
export class ShoppingcardComponent implements OnInit{

  @Input() ejemplo: Ejemplo;
  @Output() increasePrice = new EventEmitter();
  @Output() decrementPrice = new EventEmitter();

  //Temporal
  priceOfItem: number;

  numberOfItems: number;
  subTotal: number;
  priceTemporal: number;

  constructor() {
    this.numberOfItems = 1;
  }

  ngOnInit() {
    this.priceOfItem = this.ejemplo.price;
    this.priceTemporal = this.priceOfItem;
    this.numberOfItems = 1;
    this.sendPriceIncreasedToParent(); //Linea de codigo problematica
  }

  increaseItm() {
    this.numberOfItems++;
    this.priceTemporal = this.priceOfItem * this.numberOfItems;
    this.sendPriceIncreasedToParent();
  }

  decreaseItm() {
    if (this.numberOfItems == 1) {
      return;
    }
    this.numberOfItems--;
    this.priceTemporal = this.priceOfItem * this.numberOfItems;
    this.sendPriceDecrementToParent();
  }

  sendPriceIncreasedToParent() {
    this.increasePrice.emit({
      price: this.priceOfItem,
      items: this.numberOfItems
    });
  }

  sendPriceDecrementToParent() {
    this.decrementPrice.emit({
      price: this.priceOfItem
    });
  }

}
