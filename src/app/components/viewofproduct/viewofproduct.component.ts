import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { ShoppingcartService } from 'src/app/services/shoppingcart.service';
import { Loading, Report, Notify } from 'notiflix';
import { Product } from 'src/app/models/product';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-viewofproduct',
  templateUrl: './viewofproduct.component.html',
  styleUrls: ['./viewofproduct.component.scss'],
  providers: [ProductService, ShoppingcartService]
})
export class ViewofproductComponent implements OnInit {

  product: object;
  url: string;

  lastParam: string;

  productCategory: number;
  idProductToExcludeOfQuery: number;
  relatedProducts: Product[];

  public counter: number = 0

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _productService: ProductService,
    private _shoppingCartService: ShoppingcartService
  ) {
    this.url = Global.url;

    Loading.Init({
      svgColor: '#E41912',
    });

    Notify.Init({ position:"right-bottom" }); 

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

  addToCar(product: any) {
    let { ID }= product.product
    this.counter++
    let str = this.formJsonString(ID, this.counter)
    this.submitQueryToDataBase(str)
  }

  formJsonString(ID, Quantity): string {
    return `{"productID":"${ID}","quantity":"${Quantity}"}`
  }

  submitQueryToDataBase(str: string): void {
    let promise = new Promise<any> ( (resolved, rejected) => {
      this._shoppingCartService.modifyItemsQuantity(str).subscribe(
        res => resolved(res),
        err => rejected(err)
      )
    })

    promise.then((res)=>{
      Notify.Success(res.message)
      this.showCarButton()
    })
    .catch((err)=> {
      Loading.Remove()
      Report.Failure( 'Ocurrio un error', 
      err.error.message,
      'Aceptar' )
    })

  }


  showCarButton() {
    const addButtonGoToCar = document.getElementById('gtcar')
    addButtonGoToCar.innerHTML = `
    <div id="btn-gotocar" class="view__product__options__gotocar animate__animated animate__jackInTheBox">
    <button class="view__product__options__gotocar__btn">Ver carrito</button>
    </div>`
    const buttonGoToCar = document.getElementById('btn-gotocar')
    buttonGoToCar.addEventListener('click', () => {
      this.goToCar();
    })
  }

  goToCar() {
    this._router.navigate(['/shoppingCart'])
  }

}