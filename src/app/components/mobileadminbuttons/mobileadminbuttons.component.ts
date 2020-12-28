import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-mobileadminbuttons',
  templateUrl: './mobileadminbuttons.component.html',
  styleUrls: ['./mobileadminbuttons.component.scss']
})
export class MobileadminbuttonsComponent  {

  showProductOptions: boolean;

  @Output() showProducts = new EventEmitter();
  @Output() showUsers = new EventEmitter();
  @Output() addProduct = new EventEmitter();

  constructor() { 
    this.showProductOptions = false;
  }

  BtnShowProducts () {
    this.showProductOptions = false;
    this.showProducts.emit();
  }

  BtnShowUsers () {
    this.showProductOptions = false;
    this.showUsers.emit();
  }

  BtnAddProducts () {
    this.showProductOptions = false;
    this.addProduct.emit();
  }

  BtnShowProductsOptions () {
    if (this.showProductOptions) {
      this.showProductOptions = false
    }
    else {
      this.showProductOptions = true;
    }
  }

}
