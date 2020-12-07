import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Report } from 'notiflix';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.scss'],
  providers: [ProductService]
})
export class AddproductComponent implements OnInit {

  //Form control
  addProductForm: FormGroup;
  formControl: FormControl;

  constructor(
    private _builder: FormBuilder,
    private _productService: ProductService
    ) { 
    this.addProductForm = this._builder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      stock: ['', Validators.required],
      fk_category: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  onSubmit(values) {
    this._productService.addProducts(values).subscribe(
      response => {
        console.log(response);
        Report.Success('Todo correcto', response.message, 'ok');
      },
      err => {
        Report.Failure('error', err.error.message, 'ok');
      }
    );
  }

}
