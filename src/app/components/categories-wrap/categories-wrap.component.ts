import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories-wrap',
  templateUrl: './categories-wrap.component.html'
})
export class CategoriesWrapComponent  {

  constructor(
    private _router: Router
    ) { }


  searchCategory(category: number) {
    this._router.navigateByUrl(`products/category/${category}`)
  }

}
