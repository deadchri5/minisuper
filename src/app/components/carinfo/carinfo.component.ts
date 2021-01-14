import { Component, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-carinfo',
  templateUrl: './carinfo.component.html',
  styleUrls: ['./carinfo.component.scss']
})
export class CarinfoComponent implements OnChanges {

  @Input() totalPrice: number;

  @Input() totalItems: number;

  subTotal: number;

  noShipCost: boolean = false; //By default the ship cost is apply for any purchase

  constructor() { 
    this.totalPrice = 0;
    this.subTotal = 0;
    this.totalItems = 0;
  }

  ngOnChanges() {

    this.noShipCost = this.checkIfShipIsFree();

    if (!this.noShipCost) {
      this.subTotal = this.totalPrice + 30;
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


}
