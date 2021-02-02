import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Router } from '@angular/router';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-productcard',
  templateUrl: './productcard.component.html'
})
export class ProductcardComponent {

  public url: string

  @Input() products: Product[]

  constructor(private _router: Router) { 
    this.url = Global.url;
  }

  navigate (id) {
    this._router.navigateByUrl(`/view/product/${id}`);
  }

}
