import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CarProduct } from 'src/app/models/CarProduct';
import { Global } from 'src/app/services/global';
import { ShoppingcartService } from 'src/app/services/shoppingcart.service';

@Component({
  selector: 'app-shoppingcard',
  templateUrl: './shoppingcard.component.html',
  styleUrls: ['./shoppingcard.component.scss'],
  providers: [ShoppingcartService]
})
export class ShoppingcardComponent implements OnInit {

  @Input() products: CarProduct;
  @Output() increasePrice = new EventEmitter();
  @Output() decrementPrice = new EventEmitter();
  @Output() reloadParentComponent = new EventEmitter();

  priceOfItem: number;
  numberOfItems: number;
  subTotal: number;
  priceTemporal: number;
  stock: number;
  url: string;

  msjStock: string;

  constructor(private _shoppingcartService: ShoppingcartService) {
    this.numberOfItems = 1;
    this.url = Global.url;
  }

  ngOnInit() {
    this.priceOfItem = this.products.Price;
    this.priceTemporal = this.priceOfItem;
    this.numberOfItems = 1;
    this.sendPriceIncreasedToParent(); //Linea de codigo problematica
    this.checkItemStock();
  }
  
  checkItemStock() {
    this._shoppingcartService.getProductStock(this.products.ID).subscribe(
      res => {
        this.stock =  res.item.inStock
      }
    );
  }

  increaseItm() {
    if (this.numberOfItems >= this.stock) {
      this.msjStock = "No hay más stock.";
      return;
    }
    this.numberOfItems++;
    this.priceTemporal = this.priceOfItem * this.numberOfItems;
    this.sendPriceIncreasedToParent();
  }

  decreaseItm() {
    if (this.numberOfItems == 1) {
      return;
    }
    this.msjStock = "";
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

  deleteItem(idOfProductToDelete: number): void {
    
    let ProductList: CarProduct[] = JSON.parse(sessionStorage.getItem('products'));

    ProductList.forEach( (product, index) => {
      if (product.ID === idOfProductToDelete) {
        ProductList.splice(index, 1);
      }
    } );
  
    if (ProductList.length <= 0){
      sessionStorage.removeItem('products')
    }
    else {
      sessionStorage.setItem('products', JSON.stringify(ProductList));
    }
    
    this.reloadParentComponent.emit({
      cost: this.priceTemporal,
      numberOfItems: this.numberOfItems
    });

  }

}