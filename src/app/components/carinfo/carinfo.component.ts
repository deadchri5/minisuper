import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { ShoppingcartService } from 'src/app/services/shoppingcart.service';
import { CarProduct } from 'src/app/models/CarProduct';

@Component({
  selector: 'app-carinfo',
  templateUrl: './carinfo.component.html',
  providers: [ShoppingcartService]
})
export class CarinfoComponent implements OnInit, OnChanges {

  @Input() products: CarProduct[]

  public totalPrice: number
  public totalProducts: number
  public subTotal: number

  public noShipCost: boolean
  discountText: string = '';

  constructor(
    private _shoppingCartService: ShoppingcartService
  ) { 
  }

  ngOnInit(){
    this.totalPrice = this.obtainTotalPrice()
    this.totalProducts = this.obtainTotalProducts()
    this.checkDiscount()
    this.runDiscountCodeScript()
  }

  ngOnChanges() {
    this.ngOnInit()
    const discountCode = (<HTMLInputElement>document.getElementById('txt-discount')).value;
    if (discountCode != '')
    this.consultDiscount(discountCode);
  }

  obtainTotalPrice(): number {
    let totalPrice: number = 0
    this.products.forEach(product => {
      totalPrice += product.Quantity * product.Price
    })
    return totalPrice
  }

  obtainTotalProducts(): number {
    let totalProducts: number = 0
    this.products.forEach(product => {
      totalProducts += product.Quantity
    })
    return totalProducts
  }

  checkDiscount(){
    this.noShipCost = this.checkIfShipIsFree();

    if (!this.noShipCost) {
      this.subTotal = this.totalPrice + 15;
    }
    else {
      this.subTotal = this.totalPrice;
    }
  }

  checkIfShipIsFree(): boolean {
    if (this.totalPrice >= 200) {
      return true;
    }
    else {
      return false;
    }
  }

  runDiscountCodeScript() {
    const textField = (<HTMLInputElement>document.getElementById('txt-discount'));
    let timeout;
    textField.addEventListener('keyup', () => {
      clearTimeout(timeout);
      timeout = setTimeout( () => {
        this.consultDiscount(textField.value);
      }, 200)
    })
  }

  consultDiscount(code: string) {
    let discount: number;

    if (code == '') {
      code = 'empty';
    }
    code = code.toUpperCase();

    let promise = new Promise((resolved) => {
      this._shoppingCartService.getDiscount(code).subscribe(
        response => {
          this.discountText = response.message;
          resolved(response.response)
        }
      )
    }) 

    promise.then( (res:any) => {
      if (res != undefined) {
        let { Value } = res;
        discount = (Value/100) * this.subTotal;
        discount = this.subTotal - discount;
        this.displayDiscountChanges(true, discount);
      }
      else
      this.displayDiscountChanges(false, 0);
    } )

  }

  displayDiscountChanges(existDiscount: boolean, discount: number) {
    const subTotalBlock = document.getElementById('subtotal_price');
    const newPriceBlock = document.getElementById('new-price-block');

    if(existDiscount){
      subTotalBlock.classList.add('s_discount');
      newPriceBlock.innerHTML = `
          <div class="s__car__container__details">
            <span>Total con descuento</span>
            <span class="s_price">MX$${Intl.NumberFormat('en-IN').format(discount)}</span>
          </div>
      `;
    }
    else {
      if(subTotalBlock.classList.contains('s_discount')) {
        subTotalBlock.classList.remove('s_discount');
        newPriceBlock.innerHTML = '';
      }
    }
    
  }

}