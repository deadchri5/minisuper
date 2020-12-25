import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Global } from 'src/app/services/global';
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

  //Image Upload Name
  public imageUpload: string;

  afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.jpeg,.png,.gif",
    maxSize: "1",
    uploadAPI: {
      url: `${Global.url}products/addImage`,
      method: "POST",
      headers: {
        "Authorization": localStorage.getItem('token')
      },
    },
    theme: "attachPin",
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Selecciona una imagen',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !',
      sizeLimit: 'Size Limit'
    }
  };

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

  onSubmit(values, image) {

    image = this.imageUpload;

    if (image != undefined) {
      let data = {
        id: values.id,
        name: values.name,
        price: values.price,
        description: values.description,
        stock: values.stock,
        fk_category: values.fk_category,
        image: image
      }
      values = data;
    }
    
    this._productService.addProducts(values).subscribe(
      response => {
        Report.Success('Todo correcto', response.message, 'ok');
      },
      err => {
        Report.Failure('error', err.error.message, 'ok');
      }
    );
    

  }

  DocUpload(event) {
    this.imageUpload = event.body.image;
  }

}
