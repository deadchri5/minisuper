import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';


@Injectable({
    providedIn: 'root'
  })

export class ProductService {

    public url: String;

    constructor(private http: HttpClient) {
        this.url = Global.url;
    }

    getProducts():Observable<any> {
        return this.http.get(this.url+'products/show');
    }

    getProductWithID(id):Observable<any> {
        return this.http.get(`${this.url}products/getProductFromId/${id}`);
    }

    searchProducts(search: Object):Observable<any> {
        let jsonParam = JSON.stringify(search);
        let params = new HttpParams().set('json', jsonParam);
        return this.http.post(this.url+'products/search', params);
    }

    addProducts(product: Object): Observable<any> {
        let json = JSON.stringify(product);
        let params = new HttpParams().set('json', json);
        let headers = new HttpHeaders().append('Authorization', localStorage.getItem('token'));
        return this.http.put(`${this.url}products/insert`, params, {headers: headers});
    }

    deleteProduct(productID: Object): Observable<any> {
        let json = JSON.stringify(productID);
        let params = new HttpParams().set('json', json);
        let headers = new HttpHeaders().append('Authorization', localStorage.getItem('token'));
        return this.http.delete(`${this.url}products/delete`, {params: params, headers: headers});
    }

    updateProduct(product: Object): Observable<any> {
        let json = JSON.stringify(product);
        let params = new HttpParams().set('json', json);
        let headers = new HttpHeaders().append('Authorization', localStorage.getItem('token'));
        return this.http.put(`${this.url}products/update`, params, {headers: headers});
    }

}