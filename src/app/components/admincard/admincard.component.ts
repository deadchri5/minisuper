import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import { Confirm, Report, Notify } from 'notiflix';

@Component({
  selector: 'app-admincard',
  templateUrl: './admincard.component.html',
  styleUrls: ['./admincard.component.scss']
})
export class AdmincardComponent implements OnInit {

  @Input() products: Product[];
  @Output() sendProductData = new EventEmitter();

  public isActive: boolean;

  constructor(
    private _productService: ProductService
  ) { 
    this.isActive = false;
  }

  ngOnInit() {
    console.log(this.products);
  }

  deleteProduct(product){

    let idInJsonFormat = {
      id: product.ID 
    };

    Confirm.Show(
      'Eliminar producto',
      `¿Seguro que quieres borrar el producto ${product.Name}?`,
      'Si', 
      'No',
      () => {
        this._productService.deleteProduct(idInJsonFormat).subscribe(
          response => {
            Report.Success('Producto eliminado', response.message, 'ok');
          }
        );
      },
      () => {
        Notify.Failure('No se elimino ningún producto');
      }
    );
  }

  //Mandar objeto seleccionado a la clase padre
  updateProduct(product) {
    this.sendProductData.emit({
      product: product
    });
  }

}
