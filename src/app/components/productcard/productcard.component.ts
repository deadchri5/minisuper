import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-productcard',
  templateUrl: './productcard.component.html',
  styleUrls: ['./productcard.component.scss']
})
export class ProductcardComponent implements OnInit {

  public name: string;

  @Input() products: Product[];

  constructor() { 
    this.name = 'hola';
  }

  ngOnInit() {
  }

}
