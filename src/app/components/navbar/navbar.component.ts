import { Component, OnInit, OnChanges } from '@angular/core';
import { UserService } from 'src/app/services/user.service'
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private _userService: UserService) { }

  public flag: boolean = true;
  public user: User;

  mostrarMenu() {
    document.getElementById('options').classList.toggle('animate__fadeInRight');
    document.getElementById('options').classList.toggle('nav__mobile__options');
    if (this.flag) {
      document.getElementById('options').style.display = 'block';
      this.flag = false;
    }
    else {
      document.getElementById('options').style.display = 'none';
      this.flag = true;
    }
  }

  ngOnInit() {
    this._userService.getUserInfo().subscribe(
      response => {
        this.user = response.user;
      }
    );
  }

  onChanges() {
    console.log('log from navbar changes method');
  }

  showUtilities() {
    document.getElementById('list-utilities').classList.toggle('show-utilities');
  }

  logOut() {
    localStorage.removeItem('token');
    location.href="/login";
  }

}
