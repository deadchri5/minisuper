import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-mobileadminbuttons',
  templateUrl: './mobileadminbuttons.component.html',
  styleUrls: ['./mobileadminbuttons.component.scss']
})
export class MobileadminbuttonsComponent  {

  @Output() showProducts = new EventEmitter();
  @Output() showUsers = new EventEmitter();

  constructor() { }

  BtnShowProducts () {
    this.showProducts.emit();
  }

  BtnShowUsers () {
    this.showUsers.emit();
  }

}
