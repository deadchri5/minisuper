import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';

@Injectable({
  providedIn: 'root'
})
export class ShoppingcartService {

  public url: string;

  constructor(private http: HttpClient) { 
    this.url = Global.url;
  }

  getProductStock(id: number): Observable<any> {
    return this.http.get(`${this.url}ShoppingCart/${id}`);
  }

  getDiscount(code: string): Observable<any> {
    return this.http.get(`${this.url}ShoppingCart/reedem/${code}`);
  }

  getCarItems(): Observable<any> {
    let headers = new HttpHeaders().append('Authorization', localStorage.getItem('token'));
    return this.http.get(`${this.url}user/getCarProducts`, {headers: headers});
  }

  modifyItemsQuantity(product: string): Observable<any> {
    let params = new HttpParams().set('json', product);
    let headers = new HttpHeaders().append('Authorization', localStorage.getItem('token'));
    return this.http.post(`${this.url}user/addToCart`,  params, {headers: headers})
  }

  deleteCarProduct(json: string): Observable<any> {
    let params = new HttpParams().set('json', json)
    let headers = new HttpHeaders().append('Authorization', localStorage.getItem('token'))
    return this.http.delete(`${this.url}ShoppingCart/delete`, {headers: headers, params:params})
  }

}
