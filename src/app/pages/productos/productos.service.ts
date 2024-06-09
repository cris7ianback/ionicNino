import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private URL = environment.URL;

  constructor(private http: HttpClient) {

  }
  addProducto(producto: any) {
    return this.http.post<any>(this.URL + '/addProducto', producto)
  }

  deleteProducto(idProducto: any): Observable<any> {
    return this.http.delete<any[]>(this.URL + `/deleteProducto/${idProducto}`)
  }

  listProductos(): Observable<any> {
    return this.http.get<any[]>(this.URL + '/listProductos')
  }
  editProducto(data: any, idProducto: number) {
    return this.http.put<any>(this.URL + `/editProducto/${idProducto}`, data)
  }
  listProductoId(idProducto: any): Observable<any> {
    return this.http.get<any[]>(this.URL + `/searchProductoId/${idProducto}`)
  }

}

