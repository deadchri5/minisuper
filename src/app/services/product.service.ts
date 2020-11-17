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

    searchProducts(search: Object):Observable<any> {
        let jsonParam = JSON.stringify(search);
        let params = new HttpParams().set('json', jsonParam);
        return this.http.post(this.url+'products/search', params);
    }

}