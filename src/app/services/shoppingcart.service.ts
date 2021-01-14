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

}
