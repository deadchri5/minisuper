import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

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
    AddproductComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
