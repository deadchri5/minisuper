import { Component, OnInit} from '@angular/core';
import { CarProduct } from 'src/app/models/CarProduct';
import { ShoppingcartService } from 'src/app/services/shoppingcart.service';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  providers: [ShoppingcartService]
})

export class ShoppingcartComponent implements OnInit {

  public ShoppingCartItems: CarProduct[]

  constructor(
    private _shoppingCartService: ShoppingcartService
  ) { 
  }

  ngOnInit() {
    this.getProductsFromDB();
  }

  getProductsFromDB() {
    let promise = new Promise<any>( (resolved, rejected) => {
      this._shoppingCartService.getCarItems().subscribe(
        res => resolved(res),
        err => rejected(err)
      )
    } )
    promise.then((res)=> {
      let { productos } = res
      this.ShoppingCartItems = productos
    })
    .catch((err)=> {
      console.log(err)
    })
  }


}