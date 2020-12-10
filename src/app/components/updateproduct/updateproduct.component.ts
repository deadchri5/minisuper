import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { Confirm, Notify, Report } from 'notiflix';

@Component({
  selector: 'app-updateproduct',
  templateUrl: './updateproduct.component.html',
  styleUrls: ['./updateproduct.component.scss']
})
export class UpdateproductComponent implements OnChanges {

  @Input() product: Product;

  //Form
  updateProductForm: FormGroup;
  formControl: FormControl;

  constructor(
    private _productService: ProductService,
    private _builder: FormBuilder
  ) {
    this.updateProductForm = this._builder.group({
      Name: ['', Validators.required],
      Price: ['', Validators.required],
      Description: ['', Validators.required],
      Stock: ['', Validators.required],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.product.currentValue != changes.product.previousValue) {
      this.updateProductForm = this._builder.group({
        Name: [this.product.Name, Validators.required],
        Price: [this.product.Price, Validators.required],
        Description: [this.product.Description, Validators.required],
        Stock: [this.product.Stock, Validators.required],
      });
    }
  }

  onSubmit(productUpdate, ID) {
    ID = this.product.ID;
    let product = {
      Name: productUpdate.Name,
      Price: productUpdate.Price,
      Description: productUpdate.Description,
      Stock: productUpdate.Stock,
      ID: ID
    };

    Confirm.Show(
      'Actualizar producto',
      `¿Seguro que quieres actualizar los datos del producto con ID: ${ID}?`,
      'Si',
      'Cancelar',
      () => {
        this._productService.updateProduct(product).subscribe(
          response => {
            Report.Success('Producto modificado', response.message, 'Ok');
          }
        );
      }, 
      () => {
        Notify.Failure(`No se modifico el producto ${product.Name}`);
      }
    );

  }

}
