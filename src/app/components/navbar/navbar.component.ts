import { Component, OnInit } from '@angular/core';
import { NavbarObject } from 'src/app/models/navbarObject';
import { UserService } from 'src/app/services/user.service';

declare const stickyNavbar: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  providers: [UserService]
})

export class NavbarComponent implements OnInit{

  isUserLogged: boolean;
  isAdmin: boolean;
  
  userData = {
    'name': '',
    'email': ''
  }

  constructor(private _userService: UserService) {
    this.isUserLogged = false;
    this.isAdmin = false;
   }


  ngOnInit() {
    stickyNavbar();
    this.getLogginInfo();
  }

  getLogginInfo() {

    if (localStorage.getItem('token') != null) {

      let promise = new Promise ((resolve, rejected) => {
        this._userService.getUserInfo().subscribe(
          response => {
            resolve(response.user)
          },
          error => {
            rejected(error)
          }
        )
      })

      promise.then( (res: NavbarObject) => {
        this.userData.name = res.name;
        this.userData.email = res.email;
        this.isAdmin = this.checkIfUserIsAdmin(res);
        this.isUserLogged = true;
      } )

      promise.catch ( (err) => {
        console.log(err)
      } )

    }

  }

  logOut() {
    localStorage.removeItem('token');
    location.href="/";
  }


  showOrHiddenMenu() {
    const menu = document.querySelector('.nav__desktop__menu');
    if (menu.classList.contains('hidden')){
        menu.classList.remove('hidden');
        menu.classList.remove('animate__bounceOutRight');
        menu.classList.add('animate__bounceInRight');
    }
    else {
      menu.classList.remove('animate__bounceInRight');
      menu.classList.add('animate__bounceOutRight');
      setTimeout( function() {
        menu.classList.add('hidden');
      }, 600);
    }
  }

  showOrHiddenUserUtilities(): void {
    const userUtilities = document.getElementById('nav-float-menu');
    if (userUtilities.classList.contains('hidden')) {
      userUtilities.classList.remove('hidden');
    }
    else {
      userUtilities.classList.add('hidden');
    }
  }

  checkIfUserIsAdmin (user: NavbarObject): boolean {
    if (user.type == 1) {
      return true
    }
    return false;
  }

}