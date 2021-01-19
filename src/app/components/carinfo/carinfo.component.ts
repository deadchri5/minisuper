import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ShoppingcartService } from 'src/app/services/shoppingcart.service';

@Component({
  selector: 'app-carinfo',
  templateUrl: './carinfo.component.html',
  providers: [ShoppingcartService]
})
export class CarinfoComponent implements OnInit, OnChanges {

  @Input() totalPrice: number;
  @Input() totalItems: number;

  discountText: string = '';

  subTotal: number;

  noShipCost: boolean = false; //By default the ship cost is apply for any purchase

  constructor(private _shoppingCartService: ShoppingcartService) { 
    this.totalPrice = 0;
    this.subTotal = 0;
    this.totalItems = 0;
  }

  ngOnInit() {
    this.runDiscountCodeScript();
  }

  ngOnChanges() {

    this.noShipCost = this.checkIfShipIsFree();

    if (!this.noShipCost) {
      this.subTotal = this.totalPrice + 30;
    }
    else {
      this.subTotal = this.totalPrice;
    }

    const discountCode = (<HTMLInputElement>document.getElementById('txt-discount')).value;
    if (discountCode != '')
    this.consultDiscount(discountCode);
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
