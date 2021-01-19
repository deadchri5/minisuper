import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//Componentes
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { BreakfastsComponent } from './components/breakfasts/breakfasts.component';
import { ServicesComponent } from './components/services/services.component';
import { LoginComponent } from './components/login/login.component';
import { UserinfoComponent } from './components/userinfo/userinfo.component';
import { RegisterComponent } from './components/register/register.component';
import { AdminComponent }  from './components/admin/admin.component';
import { ShoppingcartComponent } from './components/shoppingcart/shoppingcart.component';
import { ViewofproductComponent } from './components/viewofproduct/viewofproduct.component';
import { Error404Component } from './components/error404/error404.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'breakfasts', component: BreakfastsComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'about', component: AboutusComponent },
  { path: 'login', component: LoginComponent },
  { path: 'userinfo', component: UserinfoComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'shoppingCart', component: ShoppingcartComponent },
  { path: 'view/product/:id', component: ViewofproductComponent },
  { path: '**', component: Error404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
