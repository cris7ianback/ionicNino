import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class InversionService {

  private URL = environment.URL;


  constructor(
    private http: HttpClient) { }


  addProductoInversion(producto: any) {
    return this.http.post<any>(this.URL + '/addProductoInversion', producto)
  }

  editProductoInversion(data: any, idInversion: any) {
    return this.http.put<any>(this.URL + `/editProductoInversion/${idInversion}`, data)
  }

  listProductosInversion(): Observable<any> {
    return this.http.get<any[]>(this.URL + '/listProductosInversion')
  }

  listProductoId(idInversion: any): Observable<any> {
    return this.http.get<any[]>(this.URL + `/searchProductoId/${idInversion}`)
  }

  deleteProductoInversion(idInversion: any): Observable<any> {
    return this.http.delete<any[]>(this.URL + `/deleteProductoInversion/${idInversion}`)
  }



}
