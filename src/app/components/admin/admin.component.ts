import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { UserService } from 'src/app/services/user.service';
import { Product } from 'src/app/models/product';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Loading } from 'notiflix';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  providers: [ProductService, UserService]
})
export class AdminComponent implements OnInit {

  //Form control
  searchForm: FormGroup;
  formControl: FormControl;

  //Models 
  products: Product[];
  productPrototipe: Product;
  users: User[];

  //Strings
  sectionTaskName: string;

  //Flags
  flagProductsTool: boolean;
  flagUsersTool: boolean;
  addProductComponentFlag: boolean;
  isModalActive: boolean;
  showAdminFrame: boolean;

  //
  showProductsCounter: number;
  showUsersCounter: number;
 

  constructor(
    private _productService: ProductService,
    private _userService: UserService,
    private _builder: FormBuilder,
    private _router: Router
  ) { 
    this.flagProductsTool = false;
    this.flagUsersTool = false;
    this.addProductComponentFlag = false;
    this.isModalActive = false;
    this.showAdminFrame = true;
    this.showProductsCounter = 0;
    this.showUsersCounter = 0;
    this.sectionTaskName = "Panel de administración";
    this.searchForm = this._builder.group({
      search: ['', Validators.required],
    });
    Loading.Init({
      svgColor: '#E41912',
    });
  }

  ngOnInit() {

    this.checkCredentials();

  }

  async checkCredentials() {

    Loading.Dots('Verificando credenciales...');

    if (localStorage.getItem('token') != null) {

      let promise = new Promise ((resolve) => {
        this._userService.getUserInfo().subscribe(
          res => {
            let { type } = res.user
            resolve(type)
          }
        )
      })

      let userType = await promise;

      if (userType == 1) {
        Loading.Remove();
      }
      else{
        this._router.navigate(['/forbidden']);
        Loading.Remove();
      }
      

  }
  else {
    this._router.navigate(['/forbidden']);
    Loading.Remove();
  }

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

  showFacturesTool() {
    this.sectionTaskName = 'Facturas del sistema';
  }

  showUsers() {
    this.users = null;
    this.products = null;
    this.addProductComponentFlag = false;
    this.showAdminFrame = false;
    this.sectionTaskName = 'Usuarios';
    this._userService.getUsers(10).subscribe(
      response => {
        this.users = response.users;
      }
    );
  }

  showProducts() {
    this.users = null;
    this.showAdminFrame = false;
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
    this.products = null;
    this.users = null;
    this.showAdminFrame = false;
    this.sectionTaskName = 'Productos';
    this.addProductComponentFlag = true;
  }

  recaveProductData(event) {
    this.isModalActive = true;
    this.productPrototipe = event.product;
  }

  closeModal() {
    this.isModalActive = false;
  }

}
