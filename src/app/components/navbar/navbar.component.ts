import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  public flag: boolean =  true; 

  mostrarMenu() {
    document.getElementById('options').classList.toggle('animate__fadeInRight');
    document.getElementById('options').classList.toggle('nav__mobile__options');
    if (this.flag){
      document.getElementById('options').style.display = 'block';
      this.flag=false;
    }
    else{
      document.getElementById('options').style.display = 'none';
      this.flag=true;
    }
    
  }

  ngOnInit() {
  }

}
