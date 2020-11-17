import { Component, OnInit } from '@angular/core';

//Load mi carousel Gllider function
declare const initGlider: any;

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.scss']
})
export class ProductlistComponent implements OnInit {

  constructor() {

  }

  ngOnInit() {
    initGlider();
  }

}
