import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Loading, Report, Notify } from 'notiflix';
import { Product } from 'src/app/models/product';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-viewofproduct',
  templateUrl: './viewofproduct.component.html',
  styleUrls: ['./viewofproduct.component.scss'],
  providers: [ProductService]
})
export class ViewofproductComponent implements OnInit {

  product: object;
  url: string;

  lastParam: string;

  productCategory: number;
  idProductToExcludeOfQuery: number;
  relatedProducts: Product[];

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _productService: ProductService
  ) {
    this.url = Global.url;

    Loading.Init({
      svgColor: '#E41912',
    });

  }

  ngOnInit() {
    
    this._activatedRoute.paramMap.subscribe(
      (params: ParamMap) => {

        Loading.Dots('Cargando...');
        window.scroll(0, 0);

        let productID = params.get('id');
        this.idProductToExcludeOfQuery = parseInt(productID);

        let promise = new Promise((resolved, rejected) => {

          this._productService.getProductWithID(productID).subscribe(
            response => {
              this.productCategory = response.product.FK_Category;
              resolved(response);
            },
            err => {
              rejected(err);
            }
          );

        });

        promise.then((obj: object) => {
          this.product = obj;
          Loading.Remove();
          this.getRelatedProducts();
        },
          () => {
            Loading.Remove();
            this._router.navigateByUrl('/products');
          });


      }
    );

  }

  getRelatedProducts() {

    let promise = new Promise((resolved) => {

      this._productService.getRelatedroduct(this.productCategory, 4, this.idProductToExcludeOfQuery).subscribe(
        response => {
          resolved(response)
        }
      );

    });

    promise.then((prod: any) => {
      this.relatedProducts = prod.products;
    })


  }

  addToCar(newProduct) {

    const products = newProduct.product;
    const { ID, Name, Price, Image } = products;
    let productsArray = [];

    const newProdObj = {
      ID: ID,
      Name: Name,
      Price: Price,
      Image: Image
    };

    //If sessionStorage value is empty
    if (sessionStorage.getItem('products') == null) {
        productsArray.push(newProdObj);
        sessionStorage.setItem('products', JSON.stringify(productsArray));
        Notify.Success(`${Name} se ha agregado al carrito de compras.`);
    }
    //if sessionStorage is not empty
    else {
      let auxArray: object[] = JSON.parse(sessionStorage.getItem('products'));

      if (this.checkIfObjectExists(auxArray, newProdObj)) {
        Report.Info (
          'Elemento ya esta en su carrito',
          `El producto ${Name} ya ha sido agregado a su carrito de compras.`,
          'Confirmar'
        );
        return;
      }

      //Add to sessionStorage if the item dont exists already
      auxArray.push(newProdObj)
      sessionStorage.setItem('products', JSON.stringify(auxArray));
      Notify.Success(`${Name} se ha agregado al carrito de compras.`);
    }
    
  }

  checkIfObjectExists(arr, obj):boolean {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].ID === obj.ID) {
        return true;
      }
    }
    return false;
  }

}