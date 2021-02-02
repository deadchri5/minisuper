import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Global } from './global';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  public url: string;

  constructor(private http: HttpClient) { 
    this.url = Global.url;
  }

  logIn(user: Object):Observable<any> {
    let json = JSON.stringify(user);
    let params = new HttpParams().set('json', json);
    return this.http.post(this.url+'signIn', params);
  }

  registerUser(data: Object): Observable<any> {
    let json = JSON.stringify(data);
    let params = new HttpParams().set('json', json);
    return this.http.post(this.url+'userRegister', params);
  }

  updateUser(user: Object):Observable<any> {
    let json = JSON.stringify(user);
    let params = new HttpParams().set('json', json);
    let headers = new HttpHeaders().append('Authorization', localStorage.getItem('token'));
    return this.http.put(this.url+'user/update', params, {headers: headers});
  }

  getUserInfo():Observable<any> {
    let headers = new HttpHeaders().append('Authorization', localStorage.getItem('token'));
    return this.http.get(this.url+'user/getData', {headers: headers});
  }

  getUsers(params):Observable<any> {
    let headers = new HttpHeaders().append('Authorization', localStorage.getItem('token'));
    if (params.limitOfQuerys == undefined) {
      return this.http.get(`${this.url}user/getUsers/10`, {headers: headers});
    }
    else {
      if (params.param != '') {
        return this.http.get(`${this.url}user/getUsers/${params.limitOfQuerys}/${params.param}`, {headers: headers});
      }
      else {
        return this.http.get(`${this.url}user/getUsers/${params.limitOfQuerys}`, {headers: headers});
      }
    }
  }

  deleteUser(user): Observable<any> {
    let json = JSON.stringify(user);
    let params = new HttpParams().set('json', json);
    let headers = new HttpHeaders().append('Authorization', localStorage.getItem('token'));
    return this.http.delete(`${this.url}user/deleteUser`, {headers: headers, params: params});
  }

  verifyPassword(password: object): Observable<any> {
    let json = JSON.stringify(password)
    let params = new HttpParams().set('json', json)
    let headers = new HttpHeaders().append('Authorization', localStorage.getItem('token'))
    return this.http.post(`${this.url}user/verifyPassword`, params, {headers: headers})
  }

}
