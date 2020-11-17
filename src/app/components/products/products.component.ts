import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [ProductService]
})
export class ProductsComponent implements OnInit {

  public searchText: string;
  public products: Product[];
  public searchForm: FormGroup;
  public formControl: FormControl;

  constructor (
    private _productService: ProductService,
    private _builder: FormBuilder,
    ) { 
    this.searchText = 'Agregado recientemente';
    this.searchForm = this._builder.group({
      search: ['', Validators.required],
    });
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
