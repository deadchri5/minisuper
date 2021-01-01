import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-viewofproduct',
  templateUrl: './viewofproduct.component.html',
  styleUrls: ['./viewofproduct.component.scss'],
  providers: [ProductService]
})
export class ViewofproductComponent implements OnInit {

  product: object;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _productService: ProductService
    ) { 

  }

  ngOnInit() {
    let productID = this._activatedRoute.snapshot.paramMap.get("id");
    this._productService.getProductWithID(productID).subscribe(
      response => {
        this.product = response;
      }
    );
  }

}