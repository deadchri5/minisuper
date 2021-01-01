import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-productcard',
  templateUrl: './productcard.component.html',
  styleUrls: ['./productcard.component.scss']
})
export class ProductcardComponent {

  public url: string;

  @Input() products: Product[];

  constructor() { 
    this.url = Global.url;
  }

}
