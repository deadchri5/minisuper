import { AfterContentInit, Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Global } from 'src/app/services/global';
import { Router } from '@angular/router';
import Glide, { Controls, Breakpoints } from '@glidejs/glide/dist/glide.modular.esm';

@Component({
  selector: 'app-glide-carousel',
  templateUrl: './glide-carousel.component.html'
})
export class GlideCarouselComponent implements OnInit, AfterContentInit {

  @Input() products: Product[];

  public url: string

  constructor(private _router: Router) {
    this.url = Global.url
   }

  ngOnInit() {
  }

  ngAfterContentInit() {
    setTimeout( () => {
      if (this.products != undefined)
      this.mountGlide()
    },1000 )
  }

  mountGlide() {
    let glide = new Glide('.glide', {
      type: 'carousel',
      startAt: 0,
      perView: 4,
      focusAt:'center',
      gap: 10,
      breakpoints: {
        900: {
          perView: 3
        },
        620: {
          perView: 2
        },
        480: {
          perView: 3,
          gap: 100
        },
        428: {
          perView: 2
        },
        390: {
          perView: 1,
          gap: 0
        }
      }
    })
    
    glide.mount({ Controls, Breakpoints })

  }

  navigate(id) {
    this._router.navigateByUrl(`/view/product/${id}`);
  }

}
