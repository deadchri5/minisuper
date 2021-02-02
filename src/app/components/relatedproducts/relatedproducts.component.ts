import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-relatedproducts',
  templateUrl: './relatedproducts.component.html'
})
export class RelatedproductsComponent implements OnChanges{

  @Input() relatedProducts: Product[];

  constructor() { 
    this.relatedProducts = null;
  }

  ngOnChanges(changes: SimpleChanges) {

    if (changes.relatedProducts.currentValue != changes.relatedProducts.previousValue) {
      this.relatedProducts = changes.relatedProducts.currentValue;
    }
    
  }

}
