import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Product } from 'src/app/models/product'; 
import { Loading } from 'notiflix';

@Component({
  selector: 'app-results-search-view',
  templateUrl: './results-search-view.component.html',
  providers: [ProductService]
})

export class ResultsSearchViewComponent implements OnInit {

  public products: Product[]
  public searchText: string
  public activateDontFoundView: boolean = false

  //text of view
  public errReasontxt: string
  public recomendActionstxt: string

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _productService: ProductService,
    private _router: Router
  ) { 

    this.errReasontxt = 'No encontramos resultados para'
    this.recomendActionstxt = 'Revisa la ortografía de tu búsqueda, utiliza palabras más generales o vuelve al inicio para ver otros artículos.'

    Loading.Init({
      svgColor: '#E41912',
    });

  }

  ngOnInit() {
    window.scroll(0, 0)
    Loading.Dots('Cargando...');
    this._activatedRoute.paramMap.subscribe(
      (params: ParamMap) => {

        let searchString = params.get('search');
        this.searchText = searchString
        searchString = `{"search":"${searchString}"}`

        let promise = new Promise<any>( (resolved, rejected) => {
          this._productService.searchProducts(JSON.parse(searchString)).subscribe(
            res => resolved(res),
            err => rejected(err)
          )
        } )

        promise.then((res) => {
          this.fillProductList(res);
        })
        .catch((err) => {
          console.log(err)
          this.activateDontFoundView = true
          Loading.Remove();
        })
        .catch(() => {

        })

        })
  }

  fillProductList(productArray: any) {
    let { products } = productArray;
    this.products = products;
    this.activateDontFoundView = false
    Loading.Remove();
  }

  backToProducts() {
    this._router.navigateByUrl('/products')
  }

}
