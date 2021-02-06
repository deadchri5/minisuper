import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CarProduct } from 'src/app/models/CarProduct';
import { Global } from 'src/app/services/global';
import { ShoppingcartService } from 'src/app/services/shoppingcart.service';
import { Report, Notify, Loading } from 'notiflix';

@Component({
  selector: 'app-shoppingcard',
  templateUrl: './shoppingcard.component.html',
  providers: [ShoppingcartService]
})

export class ShoppingcardComponent implements OnInit {

  @Output() reloadComponent = new EventEmitter()
  @Input() products: CarProduct

  public url: string
  public NoStockAdvice: string
  public totalProductPrice: number
  public inStock: number

  constructor(
    private _shoppingCartService: ShoppingcartService
  ) {
    this.url = Global.url
    Notify.Init({
      position: 'right-bottom'
    })
  }

  ngOnInit() {
    this.getProductStock(this.products.ID)
    this.getTotalCost()
  }

  getTotalCost(): void {
    if (this.products != null)
      this.totalProductPrice = this.products.Price * this.products.Quantity
  }

  ModifyItm(product: CarProduct, type: boolean): void {
    Loading.Circle();
    if (type) {
      if (product.Quantity >= this.inStock){
        Loading.Remove()
        this.NoStockAdvice = 'No hay mas stock'
        return
      }
      product.Quantity++
      let str = this.formJsonString(product)
      this.submitQueryToDataBase(str)
    }
    else {
      if (product.Quantity <= 1){
        Loading.Remove()
        return
      }
      product.Quantity--
      this.NoStockAdvice = ''
      let str = this.formJsonString(product)
      this.submitQueryToDataBase(str)
    }
  }

  formJsonString(product: CarProduct): string {
    return `{"productID":"${product.ID}","quantity":"${product.Quantity}"}`
  }

  submitQueryToDataBase(str: string): void {
    let promise = new Promise<any> ( (resolved, rejected) => {
      this._shoppingCartService.modifyItemsQuantity(str).subscribe(
        res => resolved(res),
        err => rejected(err)
      )
    })

    promise.then((res)=>{
      Loading.Remove()
      this.reloadComponent.emit()
    })
    .catch((err)=> {
      Loading.Remove()
      Report.Failure( 'Ocurrio un error', 
      err.error.message,
      'Aceptar' )
    })

  }

  getProductStock(ID: number) {
    let promise = new Promise<any>((resolved, rejected) => {
      this._shoppingCartService.getProductStock(ID).subscribe(
        res => resolved(res),
        err => rejected(err)
      )
    })
    promise.then((res) => {
      this.inStock = res.item.inStock
    })
    .catch( () => {
      location.href="/shoppingCart"
    })
  }

  deleteItem(ID: number) {
    let str: string = `{"productID":${ID}}`
    let promise = new Promise<any>((resolved, rejected) => {
      this._shoppingCartService.deleteCarProduct(str).subscribe(
        res => resolved(res),
        err => rejected(err)
      )
    })
    promise.then((res)=>{
      Notify.Success(res.message)
      this.reloadComponent.emit()
    })
    .catch((err)=>{
      Notify.Failure(err.error.message)
    })
  }

}