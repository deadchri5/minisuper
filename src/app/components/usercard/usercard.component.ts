import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-usercard',
  templateUrl: './usercard.component.html',
  styleUrls: ['./usercard.component.scss']
})
export class UsercardComponent implements OnInit {

  @Input() users: User[];

  constructor() { }

  ngOnInit() {
  }

  deleteUser(ID) {
    alert(ID);
  }

}
