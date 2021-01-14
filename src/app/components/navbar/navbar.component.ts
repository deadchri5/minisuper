import { Component, OnInit } from '@angular/core';

declare const stickyNavbar: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit{

  constructor() { }


  ngOnInit() {
    stickyNavbar();
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

}