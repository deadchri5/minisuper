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

  constructor() { 
    this.totalPrice = 0;
    this.subTotal = 0;
    this.totalItems = 0;
  }

  ngOnChanges() {
    this.subTotal = this.totalPrice + 10;
  }


}
