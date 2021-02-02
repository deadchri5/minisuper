import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularPaginatorModule } from 'angular-paginator';
import { AngularFileUploaderModule } from "angular-file-uploader";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { BreakfastsComponent } from './components/breakfasts/breakfasts.component';
import { ServicesComponent } from './components/services/services.component';
import { DesertitemComponent } from './components/desertitem/desertitem.component';
import { BannerComponent } from './components/banner/banner.component';
import { BannercovidComponent } from './components/bannercovid/bannercovid.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductlistComponent } from './components/productlist/productlist.component';
import { ProductcardComponent } from './components/productcard/productcard.component';
import { LoginComponent } from './components/login/login.component';
import { UserinfoComponent } from './components/userinfo/userinfo.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminComponent } from './components/admin/admin.component';
import { AdmincardComponent } from './components/admincard/admincard.component';
import { AddproductComponent } from './components/addproduct/addproduct.component';
import { UpdateproductComponent } from './components/updateproduct/updateproduct.component';
import { UsercardComponent } from './components/usercard/usercard.component';
import { MobileadminbuttonsComponent } from './components/mobileadminbuttons/mobileadminbuttons.component';
import { ShoppingcartComponent } from './components/shoppingcart/shoppingcart.component';
import { ShoppingcardComponent } from './components/shoppingcard/shoppingcard.component';
import { CarinfoComponent } from './components/carinfo/carinfo.component';
import { ViewofproductComponent } from './components/viewofproduct/viewofproduct.component';
import { RelatedproductsComponent } from './components/relatedproducts/relatedproducts.component';
import { Error404Component } from './components/error404/error404.component';
import { ForbiddenComponent } from './components/forbidden/forbidden.component';
import { CategoriesWrapComponent } from './components/categories-wrap/categories-wrap.component';
import { GlideCarouselComponent } from './components/glide-carousel/glide-carousel.component';
import { ResultsSearchViewComponent } from './components/results-search-view/results-search-view.component';
import { CategorySearchResultsComponent } from './components/category-search-results/category-search-results.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductsComponent,
    AboutusComponent,
    BreakfastsComponent,
    ServicesComponent,
    DesertitemComponent,
    BannerComponent,
    BannercovidComponent,
    FooterComponent,
    ProductlistComponent,
    ProductcardComponent,
    LoginComponent,
    UserinfoComponent,
    RegisterComponent,
    AdminComponent,
    AdmincardComponent,
    AddproductComponent,
    UpdateproductComponent,
    UsercardComponent,
    MobileadminbuttonsComponent,
    ShoppingcartComponent,
    ShoppingcardComponent,
    CarinfoComponent,
    ViewofproductComponent,
    RelatedproductsComponent,
    Error404Component,
    ForbiddenComponent,
    CategoriesWrapComponent,
    GlideCarouselComponent,
    ResultsSearchViewComponent,
    CategorySearchResultsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularPaginatorModule,
    AngularFileUploaderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
