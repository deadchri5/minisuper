import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { Loading } from 'notiflix';

@Component({
  selector: 'app-category-search-results',
  templateUrl: './category-search-results.component.html'
})


export class CategorySearchResultsComponent implements OnInit {

  public products: Product[]
  public productsInCategory: number
  public categoryTag: string

  public componentHaveProducts: boolean = false

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _productService: ProductService,
    private _router: Router
  ) { 
    Loading.Init({
      svgColor: '#E41912',
    });
  }

  ngOnInit() {
    window.scroll(0, 0)
    Loading.Dots('Cargando...')
    this._activatedRoute.paramMap.subscribe(
      (params: ParamMap) => {

        let category: string = params.get('category');
        this.getProducts(category)

      }
    )
  }

  getProducts(category: string) {
    
    let promise = new Promise<any> ( (resolved, rejected) => {

      this._productService.getProductsForCategory(category).subscribe(
        res => resolved(res),
        err => rejected(err)
      )

    } )

    promise.then( (res) => {
      this.fillProductCards(res)
    })
    .catch( (err) => {
      this.showErr(err)
    } )
    .catch ( () => {

    } )

  }

  fillProductCards(res) {
    let { products, size, category } = res
    console.log(category)
    this.productsInCategory = size
    this.products = products
    this.categoryTag = category
    this.componentHaveProducts = true
    Loading.Remove()
  }

  backToProductsView() {
    this._router.navigateByUrl('products')
  }

  showErr(err) {
    this.categoryTag = err.error.category.Name;
    console.log(this.categoryTag)
    Loading.Remove()
  }

}
