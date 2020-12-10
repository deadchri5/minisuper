import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  providers: [ProductService]
})
export class AdminComponent implements OnInit {

  //Form control
  searchForm: FormGroup;
  formControl: FormControl;

  //Modelos 
  products: Product[];
  productPrototipe: Product;

  //Strings
  sectionTaskName: string;

  //Flags
  flagProductsTool: boolean;
  flagUsersTool: boolean;
  addProductComponentFlag: boolean;
  showProductsCounter: number;
  showUsersCounter: number;
  isModalActive: boolean;

  constructor(
    private _productService: ProductService,
    private _builder: FormBuilder
  ) { 
    this.flagProductsTool = false;
    this.flagUsersTool = false;
    this.addProductComponentFlag = false;
    this.isModalActive = false;
    this.showProductsCounter = 0;
    this.showUsersCounter = 0;
    this.sectionTaskName = "Panel de administración";
    this.searchForm = this._builder.group({
      search: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  showProductsTool(): void {
    this.showProductsCounter++;
    if (this.flagUsersTool) {
      this.flagUsersTool = false;
      this.showUsersCounter = 0;
    }
    this.flagProductsTool = true;
    if (this.showProductsCounter >= 2) {
      this.flagProductsTool = false;
      this.showProductsCounter = 0;
    }
  }

  showUsersTool(): void {
    this.showUsersCounter++;
    if (this.flagProductsTool) {
      this.flagProductsTool = false
      this.showProductsCounter = 0;
    }
    this.flagUsersTool = true;
    if (this.showUsersCounter >= 2) {
      this.flagUsersTool = false;
      this.showUsersCounter = 0;
    }
  }

  showUsers() {
    this.sectionTaskName = 'Usuarios';
  }

  showProducts() {
    this.sectionTaskName = 'Productos';
    this.addProductComponentFlag = false;
    let promise = new Promise((resolve, reject) => {
      this._productService.getProducts().subscribe(
        response => {
          resolve(response.products);
        },
        err => {
          reject(err.message);
        }
      );
    });

    promise.then((prod: Product[]) => {
      this.products = prod;
    });

  }

  showAddProductForm() {
    this.sectionTaskName = 'Productos';
    this.addProductComponentFlag = true;
    this.products = [];

  }

  recaveProductData(event) {
    this.isModalActive = true;
    this.productPrototipe = event.product;
  }

  closeModal() {
    this.isModalActive = false;
  }

}
