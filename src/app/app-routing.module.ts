import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';

//Componentes
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { BreakfastsComponent } from './components/breakfasts/breakfasts.component';
import { ServicesComponent } from './components/services/services.component';
import { LoginComponent } from './components/login/login.component';
import { UserinfoComponent } from './components/userinfo/userinfo.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'breakfasts', component: BreakfastsComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'about', component: AboutusComponent },
  { path: 'login', component: LoginComponent },
  { path: 'userinfo', component: UserinfoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
