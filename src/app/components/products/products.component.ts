import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [ProductService]
})
export class ProductsComponent implements OnInit {

  public searchText: string;
  public products: Product[];

  constructor (
    private _productService: ProductService
    ) { 
    this.searchText = 'Quizas te puede interesar';
  }

  ngOnInit() {
    window.scroll(0, 0);
    this.getProducts();
  }

  onSubmit(param) {
    this.searchText = `Resultados para: ${param.search}`;

    this._productService.searchProducts(param).subscribe(
      response => {
        this.products = response.products;
      }
    );

  }

  getProducts() {
    this._productService.getProducts().subscribe(
      response => {
        this.products = response.products;
      },
      error => {
        this.getProducts();
      }
    );
  }

}
