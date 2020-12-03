import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-admincard',
  templateUrl: './admincard.component.html',
  styleUrls: ['./admincard.component.scss']
})
export class AdmincardComponent implements OnInit {

  @Input() products: Product[];

  constructor() { }

  ngOnInit() {
    console.log(this.products);
  }

}
